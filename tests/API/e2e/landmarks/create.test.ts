/**
 * @jest-environment node
 */

// Tools
import { PrismaClient } from "@prisma/client";
import { testPOSTRequestStatus } from "../../helpers/testStatus";
import { API_URL, convertJSONintoFormData, landmarkDataForCreation, destinationPrismaData, DESTINATION_ID, VERY_LONG_STRING } from "../../data/createLandmark/index";
// Types
import type { ValidLandmarkData } from "../../data/createLandmark/@types";
import { FieldType } from "@/@types/Description";

const expectUnprocessableEntity = async (body: Partial<ValidLandmarkData>, loadInvalidImages: boolean = false) => {
    await testPOSTRequestStatus({
        expectedStatus: 422,
        endpoint: API_URL,
        body: convertJSONintoFormData(body, loadInvalidImages),
    });
};

const prisma = new PrismaClient();

describe("POST: /landmark/create", () => {
    beforeAll(async () => {
        await prisma.destination.create(destinationPrismaData);
    });
    afterAll(async () => {
        await prisma.destination.delete({ where: { id: DESTINATION_ID } });
    });

    describe("Request body validation", () => {
        describe("Missing properties", () => {
            test("DestinationID", async () => {
                const { destinationId, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body);
            });
            test("Title", async () => {
                const { title, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body);
            });
            test("ShortDescription", async () => {
                const { shortDescription, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body);
            });
            test("Description", async () => {
                const { description, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body);
            });
            test("Thumbnail", async () => {
                const { thumbnail, ...body } = landmarkDataForCreation;
                await expectUnprocessableEntity(body);
            });
        });
        describe("Invalid values", () => {
            test("DestinationID- without coverage", async () => {
                const body = landmarkDataForCreation;
                body.destinationId = "UNEXISTING_DESTINATION_ID";
                await expectUnprocessableEntity(body);
            });
            test("DestinationID- too long", async () => {
                const body = landmarkDataForCreation;
                body.destinationId = "UNEXISTING_DESTINATION_ID";
                await expectUnprocessableEntity(body);
            });

            test("Title- too little", async () => {
                const body = landmarkDataForCreation;
                body.title = "1";
                await expectUnprocessableEntity(body);
            });
            test("Title- too big", async () => {
                const body = landmarkDataForCreation;
                body.title = VERY_LONG_STRING;
                await expectUnprocessableEntity(body);
            });
            test("ShortDescription- too little", async () => {
                const body = landmarkDataForCreation;
                body.shortDescription = "a";
                await expectUnprocessableEntity(body);
            });
            test("ShortDescription- too big", async () => {
                const body = landmarkDataForCreation;
                body.shortDescription = VERY_LONG_STRING;
                await expectUnprocessableEntity(body);
            });
            test("Thumbnail- unsupporting extension", async () => {
                await expectUnprocessableEntity(landmarkDataForCreation, true);
            });
            describe("Description", () => {
                describe("Header field", () => {
                    test("Too little", async () => {
                        const body = landmarkDataForCreation;
                        body.description[0].header = "a";
                        await expectUnprocessableEntity(body);
                    });
                    test("Too big", async () => {
                        const body = landmarkDataForCreation;
                        body.description[0].header = VERY_LONG_STRING;
                        await expectUnprocessableEntity(body);
                    });
                    test("Unexpected syntax", async () => {
                        const body = landmarkDataForCreation;
                        body.description[0] = {
                            type: FieldType.HEADER,
                            unexpected: "a",
                            syndax: "b",
                        } as any;
                        await expectUnprocessableEntity(body);
                    });
                });
                describe("Paragraph field", () => {
                    test("Too little", async () => {
                        const body = landmarkDataForCreation;
                        body.description[2].content = "a";
                        await expectUnprocessableEntity(body);
                    });
                    test("Too big", async () => {
                        const body = landmarkDataForCreation;
                        body.description[2].content = VERY_LONG_STRING;
                        await expectUnprocessableEntity(body);
                    });
                    test("Unexpected syntax", async () => {
                        const body = landmarkDataForCreation;
                        body.description[2] = {
                            type: FieldType.PARAGRAPH,
                            unexpected: "a",
                            syndax: "b",
                        } as any;
                        await expectUnprocessableEntity(body);
                    });
                });
                describe("Image field", () => {
                    test("Missing image", async () => {
                        const body = landmarkDataForCreation;
                        body.description[3].url = "description_20";
                        await expectUnprocessableEntity(body);
                    });
                    test("Invalid type", async () => {
                        const body = landmarkDataForCreation;
                        body.description[3]._sendInvalidImage = true;
                        await expectUnprocessableEntity(body);
                    });
                    test("Unexpected syntax", async () => {
                        const body = landmarkDataForCreation;
                        body.description[3] = {
                            type: FieldType.IMAGE,
                            unexpected: "a",
                            syndax: "b",
                        } as any;
                        await expectUnprocessableEntity(body);
                    });
                });
                describe("Splitted field", () => {
                    test("Unexpected syntax", async () => {
                        const body = landmarkDataForCreation;
                        body.description[1] = {
                            type: FieldType.SPLITTED,
                            unexpected: "a",
                            syndax: "b",
                        } as any;
                        await expectUnprocessableEntity(body);
                    });
                    describe("Left side", () => {
                        describe("Paragraph field", () => {
                            test("Too little", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].left = {
                                    type: FieldType.PARAGRAPH,
                                    content: "1",
                                };
                                await expectUnprocessableEntity(body);
                            });
                            test("Too big", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].left = {
                                    type: FieldType.PARAGRAPH,
                                    content: VERY_LONG_STRING,
                                };
                                await expectUnprocessableEntity(body);
                            });
                            test("Unexpected syntax", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].left = {
                                    type: FieldType.PARAGRAPH,
                                    unexpected: "a",
                                    syndax: "b",
                                } as any;
                                await expectUnprocessableEntity(body);
                            });
                        });
                        describe("Image field", () => {
                            test("Missing image", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].left = {
                                    type: FieldType.IMAGE,
                                    url: "destination_20",
                                    src: null,
                                };
                                await expectUnprocessableEntity(body);
                            });
                            test("Invalid type", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].left = {
                                    type: FieldType.IMAGE,
                                    url: "destination_20",
                                    src: null,
                                    _sendInvalidImage: true,
                                };
                                await expectUnprocessableEntity(body);
                            });
                            test("Unexpected syntax", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].left = {
                                    type: FieldType.IMAGE,
                                    unexpected: "a",
                                    syndax: "b",
                                } as any;
                                await expectUnprocessableEntity(body);
                            });
                        });
                    });
                    describe("Right side", () => {
                        describe("Paragraph field", () => {
                            test("Too little", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].right = {
                                    type: FieldType.PARAGRAPH,
                                    content: "1",
                                };
                                await expectUnprocessableEntity(body);
                            });
                            test("Too big", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].right = {
                                    type: FieldType.PARAGRAPH,
                                    content: VERY_LONG_STRING,
                                };
                                await expectUnprocessableEntity(body);
                            });
                            test("Unexpected syntax", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].right = {
                                    type: FieldType.PARAGRAPH,
                                    unexpected: "a",
                                    syndax: "b",
                                } as any;
                                await expectUnprocessableEntity(body);
                            });
                        });
                        describe("Image field", () => {
                            test("Missing image", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].right = {
                                    type: FieldType.IMAGE,
                                    url: "destination_20",
                                    src: null,
                                };
                                await expectUnprocessableEntity(body);
                            });
                            test("Invalid type", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].right = {
                                    type: FieldType.IMAGE,
                                    url: "destination_20",
                                    src: null,
                                    _sendInvalidImage: true,
                                };
                                await expectUnprocessableEntity(body);
                            });
                            test("Unexpected syntax", async () => {
                                const body = landmarkDataForCreation;
                                body.description[1].right = {
                                    type: FieldType.IMAGE,
                                    unexpected: "a",
                                    syndax: "b",
                                } as any;
                                await expectUnprocessableEntity(body);
                            });
                        });
                    });
                });
            });
        });
    });
});
