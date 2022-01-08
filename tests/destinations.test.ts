// Tools
import axios from "axios";
import { testPOSTRequestStatus } from "./helpers/testStatus";
import prisma from "./helpers/db";
import path from "path";
import fse from "fs-extra";
// Types
import type { Destination, Landmark } from "@prisma/client";
import type { UserHelper } from "./data/users";
import { FieldType } from "../@types/DestinationDescription";
import type { DestinationContentField } from "../@types/DestinationDescription";
// helpers
import { uploadDir } from "../utils/paths";
import { prepareUser } from "./data/users";
import { formData } from "./data/destination";

const API_ADDRESS = "http://localhost:3000";
//
describe("DESTINATIONS", () => {
    const RESOLUTIONS = ["360p", "480p", "720p", "1080p"];
    const users: string[] = []; // Array of User's ID which will be used after all tests to remove created Users from the DB
    const directoriesToDelete: string[] = []; // Array of Directory that will be deleted after all tests
    let adminUser: UserHelper = {
        userData: null,
        accessToken: null,
    };
    let notAdminUser: UserHelper = {
        userData: null,
        accessToken: null,
    };
    interface CreatedDestination extends Destination {
        landmarks: Landmark[];
    }
    let createdDestination: CreatedDestination | null = null;

    beforeAll(async () => {
        const _prepareUser = async (isAdmin: boolean = false): Promise<UserHelper> => {
            const result = await prepareUser(isAdmin);
            users.push(result.userData?.id as string);
            return result;
        };
        adminUser = await _prepareUser(true);
        notAdminUser = await _prepareUser();
    });
    afterAll(async () => {
        for (const directory of directoriesToDelete) {
            await fse.remove(directory);
        }
        await prisma.destination.deleteMany({
            where: {
                creatorId: adminUser.userData?.id,
            },
        });
        await prisma.user.deleteMany({ where: { id: { in: users } } });
    });

    describe("Authentication", () => {
        test("Admin should be able to create an destination", async () => {
            const { status } = await axios.post(`${API_ADDRESS}/api/destination/create`, formData, {
                headers: {
                    Cookie: adminUser.accessToken as string,
                    ...formData.getHeaders(),
                },
            });
            expect(status).toEqual(201);
        });
        test("User should NOT be able to create an destinatnion", async () => {
            await testPOSTRequestStatus("/api/destination/create", 403, notAdminUser.accessToken as string);
        });
        test("Anonymous should NOT be able to create an destinatnion", async () => {
            await testPOSTRequestStatus("/api/destination/create", 403);
        });
    });

    describe("Storing- destination", () => {
        const descriptionImagesDirectories: string[] = [];

        beforeAll(async () => {
            createdDestination = await prisma.destination.findFirst({
                where: {
                    creatorId: adminUser.userData?.id,
                },
                include: {
                    landmarks: true,
                },
            });
            directoriesToDelete.push(path.join(uploadDir, "destinations", createdDestination?.folder as string));
            //
            (createdDestination?.description as unknown as DestinationContentField[]).forEach((item) => {
                if (item.type === FieldType.IMAGE) descriptionImagesDirectories.push(item.url as string);
                else if (item.type === FieldType.SPLITTED) {
                    if (item.left.type === FieldType.IMAGE) descriptionImagesDirectories.push(item.left.url as string);
                    if (item.right.type === FieldType.IMAGE) descriptionImagesDirectories.push(item.right.url as string);
                }
            });
        });
        test("After successfully creation a new destiantnion should be stored in database", () => {
            expect(createdDestination).not.toBeNull();
        });
        test("Thumbnail should be stored in all proper resolutions", async () => {
            for (const size of RESOLUTIONS) {
                expect(await fse.pathExists(path.join(uploadDir, "destinations", createdDestination?.folder as string, "thumbnail", `${size}.jpg`))).toBeTruthy();
            }
        });
        test("All content images should be stored in all proper resolutions", async () => {
            for (const directory of descriptionImagesDirectories) {
                for (const size of RESOLUTIONS) {
                    expect(await fse.pathExists(path.join(uploadDir, "destinations", createdDestination?.folder as string, "description", directory, `${size}.jpg`))).toBeTruthy();
                }
            }
        });
    });

    describe("Storing- landmarks", () => {
        const landmarksId: string[] = [];
        const landmarksDirectories: string[] = [];
        beforeAll(() => {
            createdDestination?.landmarks.forEach((landmark) => {
                const _path = path.join(uploadDir, "landmarks", landmark.picture);

                landmarksId.push(landmark.id);
                landmarksDirectories.push(_path);
                directoriesToDelete.push(_path);
            });
        });

        test("After successfully creation of a new destination all related to them landmarks should be stored in the database", async () => {
            for (const id of landmarksId) {
                expect(await prisma.landmark.findUnique({ where: { id } })).not.toBeNull();
            }
        });
        test("All landmarks pictures should be stored in all proper resolutions", async () => {
            for (const directory of landmarksDirectories) {
                for (const size of RESOLUTIONS) {
                    expect(await fse.pathExists(path.join(directory, `${size}.jpg`))).toBeTruthy();
                }
            }
        });
    });
});
