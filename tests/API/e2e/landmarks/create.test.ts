/**
 * @jest-environment node
 */

// Tools
import path from "path";
import fse from "fs-extra";
import { uploadDir } from "@/utils/paths";
import { PrismaClient } from "@prisma/client";
import { testRequestStatus } from "@/tests/API/helpers/testStatus";
import MockUser from "@/tests/API/helpers/mocks/MockUser";
import { convertJSONintoFormData, landmarkDataForCreation, destinationPrismaData, DESTINATION_ID, VERY_LONG_STRING, EXPECTED_DESCRIPTION_IMAGES } from "../../data/landmarks/create";
// Types
import type { Landmark, ContentStatus } from "@prisma/client";
import { FieldType } from "@/@types/Description";
import type { ValidLandmarkData } from "@/tests/API/data/landmarks/create/@types";

const expectUnprocessableEntity = async (body: Partial<ValidLandmarkData>, Cookie: string) => {
    await testRequestStatus({
        expectedStatus: 422,
        endpoint: "/api/landmark/create",
        body: convertJSONintoFormData(body),
        Cookie,
    });
};

const getValidLandmarkData = (): ValidLandmarkData => JSON.parse(JSON.stringify(landmarkDataForCreation));

const prisma = new PrismaClient();

describe("POST: api/landmark/create", () => {
    let freshlyCreatedLandmark: Landmark | null = null;
    const SheerUser = new MockUser();

    beforeAll(async () => {
        await prisma.destination.create(destinationPrismaData);
        await SheerUser.prepare();
    });
    afterAll(async () => {
        await prisma.destination.delete({ where: { id: DESTINATION_ID } });
        await prisma.landmark.deleteMany({ where: { destinationId: DESTINATION_ID } });
        await SheerUser.remove();

        if (freshlyCreatedLandmark) {
            await fse.remove(path.join(uploadDir, "landmarks", (freshlyCreatedLandmark as Landmark).folder));
        }
    });

    test("Unauthenticated user cannot create a landmark", async () => {
        await testRequestStatus({
            expectedStatus: 401,
            endpoint: "/api/landmark/create",
            body: convertJSONintoFormData(getValidLandmarkData()),
        });
    });
    describe("Landmark can be created while using valid data", () => {
        beforeAll(async () => {
            await testRequestStatus({
                expectedStatus: 201,
                endpoint: "/api/landmark/create",
                body: convertJSONintoFormData(getValidLandmarkData()),
                Cookie: SheerUser.accessTokenAsCookie as string,
            });
            freshlyCreatedLandmark = await prisma.landmark.findFirst({
                where: { destinationId: landmarkDataForCreation.destinationId },
            });

            expect(freshlyCreatedLandmark).not.toBeNull();
        });
        describe("Landmark should be stored property in the db", () => {
            test("Title property is the same", async () => {
                expect(freshlyCreatedLandmark).not.toBeNull();
                expect((freshlyCreatedLandmark as Landmark).title).toEqual(landmarkDataForCreation.title);
            });
            test("LandmarkType property is the same", async () => {
                expect(freshlyCreatedLandmark).not.toBeNull();
                expect((freshlyCreatedLandmark as Landmark).type).toEqual(landmarkDataForCreation.type);
            });
            test("ShortDescription property is the same", async () => {
                expect(freshlyCreatedLandmark).not.toBeNull();
                expect((freshlyCreatedLandmark as Landmark).shortDescription).toEqual(landmarkDataForCreation.shortDescription);
            });
            test("Slug is generated", async () => {
                expect(freshlyCreatedLandmark).not.toBeNull();
                expect((freshlyCreatedLandmark as Landmark).slug).not.toBeFalsy();
            });
            test("Status should be set to 'WAITING_FOR_APPROVAL'", async () => {
                expect(freshlyCreatedLandmark).not.toBeNull();
                expect((freshlyCreatedLandmark as Landmark).status).toEqual("WAITING_FOR_APPROVAL" as ContentStatus);
            });
        });
        describe("All images should be stored correctly", () => {
            test("Images should be stored in properly named directory", async () => {
                expect(freshlyCreatedLandmark).not.toBeNull();
                const folder = (freshlyCreatedLandmark as Landmark).folder;
                expect(fse.existsSync(path.join(uploadDir, "landmarks", folder))).toBeTruthy();
            });
            test("Images file structure should match a general convention", async () => {
                expect(freshlyCreatedLandmark).not.toBeNull();
                const folder = (freshlyCreatedLandmark as Landmark).folder;
                expect(fse.existsSync(path.join(uploadDir, "landmarks", folder, "thumbnail"))).toBeTruthy();
                expect(fse.existsSync(path.join(uploadDir, "landmarks", folder, "description"))).toBeTruthy();
            });
            describe("Thumbnail should be stored in all resolutions", () => {
                test("in 360p", async () => {
                    expect(freshlyCreatedLandmark).not.toBeNull();
                    const folder = (freshlyCreatedLandmark as Landmark).folder;
                    expect(fse.existsSync(path.join(uploadDir, "landmarks", folder, "thumbnail", "360p.jpg"))).toBeTruthy();
                });
                test("in 480p", async () => {
                    expect(freshlyCreatedLandmark).not.toBeNull();
                    const folder = (freshlyCreatedLandmark as Landmark).folder;
                    expect(fse.existsSync(path.join(uploadDir, "landmarks", folder, "thumbnail", "480p.jpg"))).toBeTruthy();
                });
                test("in 720p", async () => {
                    expect(freshlyCreatedLandmark).not.toBeNull();
                    const folder = (freshlyCreatedLandmark as Landmark).folder;
                    expect(fse.existsSync(path.join(uploadDir, "landmarks", folder, "thumbnail", "720p.jpg"))).toBeTruthy();
                });
                test("in 1080p", async () => {
                    expect(freshlyCreatedLandmark).not.toBeNull();
                    const folder = (freshlyCreatedLandmark as Landmark).folder;
                    expect(fse.existsSync(path.join(uploadDir, "landmarks", folder, "thumbnail", "1080p.jpg"))).toBeTruthy();
                });
            });
            describe("All description images should be stored in all resolutions", () => {
                test("in 360p", async () => {
                    expect(freshlyCreatedLandmark).not.toBeNull();
                    const folder = (freshlyCreatedLandmark as Landmark).folder;
                    for (const descriptionImage of EXPECTED_DESCRIPTION_IMAGES) {
                        expect(fse.existsSync(path.join(uploadDir, "landmarks", folder, "description", descriptionImage, "360p.jpg"))).toBeTruthy();
                    }
                });
                test("in 480p", async () => {
                    expect(freshlyCreatedLandmark).not.toBeNull();
                    const folder = (freshlyCreatedLandmark as Landmark).folder;
                    for (const descriptionImage of EXPECTED_DESCRIPTION_IMAGES) {
                        expect(fse.existsSync(path.join(uploadDir, "landmarks", folder, "description", descriptionImage, "480p.jpg"))).toBeTruthy();
                    }
                });
                test("in 720p", async () => {
                    expect(freshlyCreatedLandmark).not.toBeNull();
                    const folder = (freshlyCreatedLandmark as Landmark).folder;
                    for (const descriptionImage of EXPECTED_DESCRIPTION_IMAGES) {
                        expect(fse.existsSync(path.join(uploadDir, "landmarks", folder, "description", descriptionImage, "720p.jpg"))).toBeTruthy();
                    }
                });
                test("in 1080p", async () => {
                    expect(freshlyCreatedLandmark).not.toBeNull();
                    const folder = (freshlyCreatedLandmark as Landmark).folder;
                    for (const descriptionImage of EXPECTED_DESCRIPTION_IMAGES) {
                        expect(fse.existsSync(path.join(uploadDir, "landmarks", folder, "description", descriptionImage, "1080p.jpg"))).toBeTruthy();
                    }
                });
            });
        });
        test("Landmark should have propertly working relation with destination", async () => {
            const data = await prisma.landmark.findFirst({
                where: { destinationId: landmarkDataForCreation.destinationId },
                include: { destination: true },
            });
            expect(data).not.toBeFalsy();
            expect(data?.destination).not.toBeFalsy();
        });
        test("Landmark should have propertly working relation with creator", async () => {
            const data = await prisma.landmark.findFirst({
                where: { destinationId: landmarkDataForCreation.destinationId },
                include: { creator: true },
            });
            expect(data).not.toBeFalsy();
            expect(data?.creator).not.toBeFalsy();
        });
    });
    describe("Request body validation", () => {
        describe("Missing properties", () => {
            test("DestinationID", async () => {
                const { destinationId, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Title", async () => {
                const { title, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("ShortDescription", async () => {
                const { shortDescription, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Type", async () => {
                const { type, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Description", async () => {
                const { description, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Thumbnail", async () => {
                const { thumbnail, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
        });
        describe("Invalid values", () => {
            test("DestinationID- without coverage", async () => {
                const body = getValidLandmarkData();
                body.destinationId = "UNEXISTING_DESTINATION_ID";
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Type- not included in ENUM", async () => {
                const body = getValidLandmarkData();
                body.type = "UNEXISTING_LANDMARK_TYPE" as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Title- too little", async () => {
                const body = getValidLandmarkData();
                body.title = "1";
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Title- too big", async () => {
                const body = getValidLandmarkData();
                body.title = VERY_LONG_STRING;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("ShortDescription- too little", async () => {
                const body = getValidLandmarkData();
                body.shortDescription = "a";
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("ShortDescription- too big", async () => {
                const body = getValidLandmarkData();
                body.shortDescription = VERY_LONG_STRING;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            describe("Description", () => {
                describe("Header field", () => {
                    test("Too little", async () => {
                        const body = getValidLandmarkData();
                        body.description[0].header = "a";
                        await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                    });
                    test("Too big", async () => {
                        const body = getValidLandmarkData();
                        body.description[0].header = VERY_LONG_STRING;
                        await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                    });
                    test("Unexpected syntax", async () => {
                        const body = getValidLandmarkData();
                        body.description[0] = {
                            type: FieldType.HEADER,
                            unexpected: "a",
                            syndax: "b",
                        } as any;
                        await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                    });
                });
                describe("Paragraph field", () => {
                    test("Too little", async () => {
                        const body = getValidLandmarkData();
                        body.description[2].content = "a";
                        await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                    });
                    test("Too big", async () => {
                        const body = getValidLandmarkData();
                        body.description[2].content = VERY_LONG_STRING;
                        await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                    });
                    test("Unexpected syntax", async () => {
                        const body = getValidLandmarkData();
                        body.description[2] = {
                            type: FieldType.PARAGRAPH,
                            unexpected: "a",
                            syndax: "b",
                        } as any;
                        await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                    });
                });
                describe("Image field", () => {
                    test("Missing image", async () => {
                        const body = getValidLandmarkData();
                        body.description[3].url = "description_20";
                        await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                    });
                    test("Unexpected syntax", async () => {
                        const body = getValidLandmarkData();
                        body.description[3] = {
                            type: FieldType.IMAGE,
                            unexpected: "a",
                            syndax: "b",
                        } as any;
                        await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                    });
                });

                describe("Splitted field", () => {
                    test("Unexpected syntax", async () => {
                        const body = getValidLandmarkData();
                        body.description[1] = {
                            type: FieldType.SPLITTED,
                            unexpected: "a",
                            syndax: "b",
                        } as any;
                        await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                    });
                    describe("Left side", () => {
                        describe("Paragraph field", () => {
                            test("Too little", async () => {
                                const body = getValidLandmarkData();
                                body.description[1].left = {
                                    type: FieldType.PARAGRAPH,
                                    content: "1",
                                };
                                body.description.shift();
                                body.description.pop();
                                body.description.pop();
                                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                            });
                            test("Too big", async () => {
                                const body = getValidLandmarkData();
                                body.description[1].left = {
                                    type: FieldType.PARAGRAPH,
                                    content: VERY_LONG_STRING,
                                };
                                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                            });
                            test("Unexpected syntax", async () => {
                                const body = getValidLandmarkData();
                                body.description[1].left = {
                                    type: FieldType.PARAGRAPH,
                                    unexpected: "a",
                                    syndax: "b",
                                } as any;
                                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                            });
                        });
                        describe("Image field", () => {
                            test("Missing image", async () => {
                                const body = getValidLandmarkData();
                                body.description[1].left = {
                                    type: FieldType.IMAGE,
                                    url: "destination_20",
                                    src: null,
                                };
                                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                            });
                            test("Unexpected syntax", async () => {
                                const body = getValidLandmarkData();
                                body.description[1].left = {
                                    type: FieldType.IMAGE,
                                    unexpected: "a",
                                    syndax: "b",
                                } as any;
                                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                            });
                        });
                    });
                    describe("Right side", () => {
                        describe("Paragraph field", () => {
                            test("Too little", async () => {
                                const body = getValidLandmarkData();
                                body.description[1].right = {
                                    type: FieldType.PARAGRAPH,
                                    content: "1",
                                };
                                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                            });
                            test("Too big", async () => {
                                const body = getValidLandmarkData();
                                body.description[1].right = {
                                    type: FieldType.PARAGRAPH,
                                    content: VERY_LONG_STRING,
                                };
                                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                            });
                            test("Unexpected syntax", async () => {
                                const body = getValidLandmarkData();
                                body.description[1].right = {
                                    type: FieldType.PARAGRAPH,
                                    unexpected: "a",
                                    syndax: "b",
                                } as any;
                                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                            });
                        });
                        describe("Image field", () => {
                            test("Missing image", async () => {
                                const body = getValidLandmarkData();
                                body.description[1].right = {
                                    type: FieldType.IMAGE,
                                    url: "destination_20",
                                    src: null,
                                };
                                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                            });
                            test("Unexpected syntax", async () => {
                                const body = getValidLandmarkData();
                                body.description[1].right = {
                                    type: FieldType.IMAGE,
                                    unexpected: "a",
                                    syndax: "b",
                                } as any;
                                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                            });
                        });
                    });
                });
            });
        });
    });
});
