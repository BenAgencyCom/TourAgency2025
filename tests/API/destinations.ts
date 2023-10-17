/**
 * @jest-environment node
 */

// Tools
import axios from "axios";
import { testRequestStatus } from "./helpers/testStatus";
import prisma from "./helpers/db";
import path from "path";
import FormData from "form-data";
import fse from "fs-extra";
// Types
import type { Destination, Landmark } from "@prisma/client";
import type { UserHelper } from "./data/users";
import { FieldType } from "@/@types/Description";
import type { DescriptionContentField } from "@/@types/Description";
import type { BetterJoiError } from "@/utils/api/betterJoiErrors";
// helpers
import { uploadDir } from "@/utils/paths";
import { prepareUser } from "./data/users";
import {
    formData, //
    formDataWithoutThumbnail,
    formDataWithoutLandmarkImage,
    formDataWithoutDescriptionImage,
    formWithInvalidGeneralInformation,
    formDataWithInvalidLandmarks,
    formDataWithInvalidDescription__NoTypeProvided,
    formDataWithInvalidDescription__NoImageProvided,
    formDataWithInvalidDescription__UnexpectedType,
    formDataWithInvalidDescription__InvalidHeaderLength,
    formDataWithInvalidDescription__InvalidParagraphLengthInSplittedField,
} from "./data/destination";

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
        test("Admin should be able to create a destination", async () => {
            const { status } = await axios.post(`${API_ADDRESS}/api/destination/create`, formData, {
                headers: {
                    Cookie: adminUser.accessToken as string,
                    ...formData.getHeaders(),
                },
            });
            expect(status).toEqual(201);
        });
        test("User should NOT be able to create an destinatnion", async () => {
            await testRequestStatus({
                endpoint: "/api/destination/create",
                expectedStatus: 403,
                Cookie: notAdminUser.accessToken as string,
            });
        });
        test("Anonymous should NOT be able to create an destinatnion", async () => {
            await testRequestStatus({
                endpoint: "/api/destination/create",
                expectedStatus: 403,
            });
        });
    });

    describe("Handle invalid body requests", () => {
        const testRequestWithInvalidBody = async (data: FormData, expectedErrors: Record<string, string>) => {
            await axios
                .post(`${API_ADDRESS}/api/destination/create`, data, {
                    headers: {
                        Cookie: adminUser.accessToken as string,
                        ...data.getHeaders(),
                    },
                })
                .then((response) => {
                    expect(response.status).toEqual(400);
                })
                .catch(({ response }) => {
                    expect(response.status).toEqual(400);
                    (response.data as BetterJoiError[]).forEach((occuredError) => {
                        expect(occuredError.type).toEqual(expectedErrors[occuredError.element]);
                    });
                });
        };
        describe("An error should be detected while attempting to create a destination with invalid body", () => {
            test("Without a thumbnail", async () => {
                await testRequestWithInvalidBody(formDataWithoutThumbnail, { thumbnail: "required" });
            });
            test("Without a certain description image", async () => {
                await testRequestWithInvalidBody(formDataWithoutDescriptionImage, { description_3: "required" });
            });
            test("Without a certain landmark image", async () => {
                await testRequestWithInvalidBody(formDataWithoutLandmarkImage, { landmark_2: "required" });
            });
            test("With invalid general information", async () => {
                await testRequestWithInvalidBody(formWithInvalidGeneralInformation, {
                    city: "max",
                    continent: "only",
                    country: "required",
                    population: "required",
                });
            });

            test("With general invalid landmarks", async () => {
                await testRequestWithInvalidBody(formDataWithInvalidLandmarks, { "Landmark with index 0": "description-max" });
            });

            describe("Invalid description's single field", () => {
                test("No type provided", async () => {
                    await testRequestWithInvalidBody(formDataWithInvalidDescription__NoTypeProvided, { "Description field with index 0": "no-type-defined" });
                });
                test("Invalid type provided", async () => {
                    await testRequestWithInvalidBody(formDataWithInvalidDescription__UnexpectedType, { "Description field with index 1": "unexpected-type" });
                });
                test("No image provided in IMAGE type field", async () => {
                    await testRequestWithInvalidBody(formDataWithInvalidDescription__NoImageProvided, { "Description field with index 1, subfield- LEFT": "required" });
                });
                test("Invalid header length", async () => {
                    await testRequestWithInvalidBody(formDataWithInvalidDescription__InvalidHeaderLength, { "Description field with index 0": "max" });
                });
                test("Invalid paragraph length in splitted field", async () => {
                    await testRequestWithInvalidBody(formDataWithInvalidDescription__InvalidParagraphLengthInSplittedField, { "Description field with index 1, subfield- RIGHT": "min" });
                });
            });
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
            (createdDestination?.description as unknown as DescriptionContentField[]).forEach((item) => {
                if (item.type === FieldType.IMAGE) descriptionImagesDirectories.push(item.url as string);
                else if (item.type === FieldType.SPLITTED) {
                    if (item.left.type === FieldType.IMAGE) descriptionImagesDirectories.push(item.left.url as string);
                    if (item.right.type === FieldType.IMAGE) descriptionImagesDirectories.push(item.right.url as string);
                }
            });
        });
        test("Destination stored in the DB", () => {
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
                const _path = path.join(uploadDir, "landmarks", landmark.folder);

                landmarksId.push(landmark.id);
                landmarksDirectories.push(_path);
                directoriesToDelete.push(_path);
            });
        });

        test("Landmarks should be stored in the database", async () => {
            for (const id of landmarksId) {
                expect(await prisma.landmark.findUnique({ where: { id } })).not.toBeNull();
            }
        });
        test("All landmarks images should be stored in all proper resolutions", async () => {
            for (const directory of landmarksDirectories) {
                for (const size of RESOLUTIONS) {
                    expect(await fse.pathExists(path.join(directory, `${size}.jpg`))).toBeTruthy();
                }
            }
        });
    });
});
