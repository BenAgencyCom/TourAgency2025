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
import { convertJSONintoFormData, VERY_LONG_STRING, EXPECTED_DESCRIPTION_IMAGES, createValidDestinationData } from "@/tests/API/data/destinations/create/index";
// Types
import { FieldType } from "@/@types/Description";
import type { Destination, ContentStatus } from "@prisma/client";
import type { ValidDestinationData } from "@/tests/API/data/destinations/create/@types";

const expectUnprocessableEntity = async (body: Partial<ValidDestinationData>, Cookie: string) => {
    await testRequestStatus({
        expectedStatus: 422,
        endpoint: "/api/destination/create",
        body: convertJSONintoFormData(body),
        Cookie,
    });
};

const prisma = new PrismaClient();

describe("POST: api/destination/create", () => {
    let freshlyCreatedDestination: Destination | null = null;
    const SheerUser = new MockUser();

    beforeAll(async () => {
        await SheerUser.prepare();
    });
    afterAll(async () => {
        await SheerUser.remove();

        if (freshlyCreatedDestination) {
            await fse.remove(path.join(uploadDir, "destinations", (freshlyCreatedDestination as Destination).folder));
        }
    });

    test("Unauthenticated user cannot create a destination", async () => {
        await testRequestStatus({
            expectedStatus: 401,
            endpoint: "/api/destination/create",
            body: createValidDestinationData(),
        });
    });
    describe("Destination can be created while using valid data", () => {
        const body = createValidDestinationData();

        beforeAll(async () => {
            await testRequestStatus({
                expectedStatus: 201,
                endpoint: "/api/destination/create",
                body: convertJSONintoFormData(body),
                Cookie: SheerUser.accessTokenAsCookie as string,
            });
            freshlyCreatedDestination = await prisma.destination.findFirst({
                where: {
                    creatorId: SheerUser.id as string,
                },
            });

            expect(freshlyCreatedDestination).not.toBeNull();
        });
        describe("Destination should be stored property in the db", () => {
            test("City property is the same", async () => {
                expect(freshlyCreatedDestination).not.toBeNull();
                expect((freshlyCreatedDestination as Destination).city).toEqual(body.city);
            });
            test("Country property is the same", async () => {
                expect(freshlyCreatedDestination).not.toBeNull();
                expect((freshlyCreatedDestination as Destination).country).toEqual(body.country.label);
                expect((freshlyCreatedDestination as Destination).countryCode).toEqual(body.country.code.toLowerCase());
                expect((freshlyCreatedDestination as Destination).country_lowercase).toEqual(body.country.label.toLowerCase());
            });
            test("ShortDescription property is the same", async () => {
                expect(freshlyCreatedDestination).not.toBeNull();
                expect((freshlyCreatedDestination as Destination).shortDescription).toEqual(body.shortDescription);
            });
            test("Continent property is the same", async () => {
                expect(freshlyCreatedDestination).not.toBeNull();
                expect((freshlyCreatedDestination as Destination).continent).toEqual(body.continent);
            });
            test("Population property is the same", async () => {
                expect(freshlyCreatedDestination).not.toBeNull();
                expect((freshlyCreatedDestination as Destination).population).toEqual(body.population);
            });
            test("Slug is generated", async () => {
                expect(freshlyCreatedDestination).not.toBeNull();
                expect((freshlyCreatedDestination as Destination).slug).not.toBeFalsy();
            });
            test("Status should be set to 'WAITING_FOR_APPROVAL'", async () => {
                expect(freshlyCreatedDestination).not.toBeNull();
                expect((freshlyCreatedDestination as Destination).status).toEqual("WAITING_FOR_APPROVAL" as ContentStatus);
            });
        });

        describe("All images should be stored correctly", () => {
            test("Images should be stored in properly named directory", async () => {
                expect(freshlyCreatedDestination).not.toBeNull();
                const folder = (freshlyCreatedDestination as Destination).folder;
                expect(fse.existsSync(path.join(uploadDir, "destinations", folder))).toBeTruthy();
            });
            test("Images file structure should match a general convention", async () => {
                expect(freshlyCreatedDestination).not.toBeNull();
                const folder = (freshlyCreatedDestination as Destination).folder;
                expect(fse.existsSync(path.join(uploadDir, "destinations", folder, "thumbnail"))).toBeTruthy();
                expect(fse.existsSync(path.join(uploadDir, "destinations", folder, "description"))).toBeTruthy();
            });
            describe("Thumbnail should be stored in all resolutions", () => {
                test("in 360p", async () => {
                    expect(freshlyCreatedDestination).not.toBeNull();
                    const folder = (freshlyCreatedDestination as Destination).folder;
                    expect(fse.existsSync(path.join(uploadDir, "destinations", folder, "thumbnail", "360p.jpg"))).toBeTruthy();
                });
                test("in 480p", async () => {
                    expect(freshlyCreatedDestination).not.toBeNull();
                    const folder = (freshlyCreatedDestination as Destination).folder;
                    expect(fse.existsSync(path.join(uploadDir, "destinations", folder, "thumbnail", "480p.jpg"))).toBeTruthy();
                });
                test("in 720p", async () => {
                    expect(freshlyCreatedDestination).not.toBeNull();
                    const folder = (freshlyCreatedDestination as Destination).folder;
                    expect(fse.existsSync(path.join(uploadDir, "destinations", folder, "thumbnail", "720p.jpg"))).toBeTruthy();
                });
                test("in 1080p", async () => {
                    expect(freshlyCreatedDestination).not.toBeNull();
                    const folder = (freshlyCreatedDestination as Destination).folder;
                    expect(fse.existsSync(path.join(uploadDir, "destinations", folder, "thumbnail", "1080p.jpg"))).toBeTruthy();
                });
            });
            describe("All description images should be stored in all resolutions", () => {
                test("in 360p", async () => {
                    expect(freshlyCreatedDestination).not.toBeNull();
                    const folder = (freshlyCreatedDestination as Destination).folder;
                    for (const descriptionImage of EXPECTED_DESCRIPTION_IMAGES) {
                        expect(fse.existsSync(path.join(uploadDir, "destinations", folder, "description", descriptionImage, "360p.jpg"))).toBeTruthy();
                    }
                });
                test("in 480p", async () => {
                    expect(freshlyCreatedDestination).not.toBeNull();
                    const folder = (freshlyCreatedDestination as Destination).folder;
                    for (const descriptionImage of EXPECTED_DESCRIPTION_IMAGES) {
                        expect(fse.existsSync(path.join(uploadDir, "destinations", folder, "description", descriptionImage, "480p.jpg"))).toBeTruthy();
                    }
                });
                test("in 720p", async () => {
                    expect(freshlyCreatedDestination).not.toBeNull();
                    const folder = (freshlyCreatedDestination as Destination).folder;
                    for (const descriptionImage of EXPECTED_DESCRIPTION_IMAGES) {
                        expect(fse.existsSync(path.join(uploadDir, "destinations", folder, "description", descriptionImage, "720p.jpg"))).toBeTruthy();
                    }
                });
                test("in 1080p", async () => {
                    expect(freshlyCreatedDestination).not.toBeNull();
                    const folder = (freshlyCreatedDestination as Destination).folder;
                    for (const descriptionImage of EXPECTED_DESCRIPTION_IMAGES) {
                        expect(fse.existsSync(path.join(uploadDir, "destinations", folder, "description", descriptionImage, "1080p.jpg"))).toBeTruthy();
                    }
                });
            });
        });

        test("Destination should have propertly working relation with creator", async () => {
            const data = await prisma.destination.findFirst({
                where: {
                    creatorId: SheerUser.id as string,
                },
                include: { creator: true },
            });
            expect(data).not.toBeFalsy();
            expect(data?.creator).not.toBeFalsy();
        });
    });
    describe("Request body validation", () => {
        describe("City", () => {
            test("Missing", async () => {
                const { city, ...body } = createValidDestinationData();
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Too little", async () => {
                const body = createValidDestinationData();
                body.city = "1";
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Too big", async () => {
                const body = createValidDestinationData();
                body.city = VERY_LONG_STRING;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- object", async () => {
                const body = createValidDestinationData();
                body.city = JSON.stringify({} as any);
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- boolean", async () => {
                const body = createValidDestinationData();
                body.city = false as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
        });
        describe("Population", () => {
            test("Missing", async () => {
                const { population, ...body } = createValidDestinationData();
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Negative number", async () => {
                const body = createValidDestinationData();
                body.population = -3123;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Too big", async () => {
                const body = createValidDestinationData();
                body.population = 9999999999999;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- string", async () => {
                const body = createValidDestinationData();
                body.population = "dsadsa" as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- object", async () => {
                const body = createValidDestinationData();
                body.population = JSON.stringify({ unexpected: "value with object type" }) as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- boolean", async () => {
                const body = createValidDestinationData();
                body.population = false as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
        });
        describe("Continent", () => {
            test("Missing", async () => {
                const { continent, ...body } = createValidDestinationData();
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid value (not included in enum)", async () => {
                const body = createValidDestinationData();
                body.continent = "UNEXISTING_CONTINENT" as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- boolean", async () => {
                const body = createValidDestinationData();
                body.continent = false as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- object", async () => {
                const body = createValidDestinationData();
                body.continent = JSON.stringify({ unexpected: "value with object type" }) as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
        });
        describe("Short description", () => {
            test("Missing", async () => {
                const { shortDescription, ...body } = createValidDestinationData();
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Too little", async () => {
                const body = createValidDestinationData();
                body.shortDescription = "1";
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Too big", async () => {
                const body = createValidDestinationData();
                body.shortDescription = VERY_LONG_STRING;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });

            test("Invalid type- object", async () => {
                const body = createValidDestinationData();
                body.shortDescription = JSON.stringify({ unexpected: "value with object type" }) as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- boolean", async () => {
                const body = createValidDestinationData();
                body.shortDescription = false as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
        });
        describe("Country", () => {
            test("Missing", async () => {
                const { country, ...body } = createValidDestinationData();
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- string", async () => {
                const body = createValidDestinationData();
                body.country = "" as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- object with invalid syntax", async () => {
                const body = createValidDestinationData();
                body.country = { invalid: "syntax" } as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            test("Invalid type- boolean", async () => {
                const body = createValidDestinationData();
                body.country = false as any;
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
            describe("Label", () => {
                test("Missing", async () => {
                    const body = createValidDestinationData();
                    delete (body.country as any).label;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Too little", async () => {
                    const body = createValidDestinationData();
                    body.country.label = "1";
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Too big", async () => {
                    const body = createValidDestinationData();
                    body.country.label = VERY_LONG_STRING;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Invalid type- object", async () => {
                    const body = createValidDestinationData();
                    body.country.label = JSON.stringify({ unexpected: "value with object type" }) as any;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Invalid type- boolean", async () => {
                    const body = createValidDestinationData();
                    body.country.label = false as any;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
            });
            describe("Code", () => {
                test("Missing", async () => {
                    const body = createValidDestinationData();
                    delete (body.country as any).code;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Too little", async () => {
                    const body = createValidDestinationData();
                    body.country.code = "1";
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Too big", async () => {
                    const body = createValidDestinationData();
                    body.country.code = "12313";
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Invalid type- object", async () => {
                    const body = createValidDestinationData();
                    body.country.code = JSON.stringify({ unexpected: "value with object type" }) as any;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Invalid type- boolean", async () => {
                    const body = createValidDestinationData();
                    body.country.code = false as any;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
            });
            describe("Phone", () => {
                test("Missing", async () => {
                    const body = createValidDestinationData();
                    delete (body.country as any).phone;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Too big", async () => {
                    const body = createValidDestinationData();
                    body.country.phone = VERY_LONG_STRING;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Invalid type- object", async () => {
                    const body = createValidDestinationData();
                    body.country.phone = JSON.stringify({ unexpected: "value with object type" }) as any;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Invalid type- boolean", async () => {
                    const body = createValidDestinationData();
                    body.country.phone = false as any;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
            });
        });
        describe("Thumbnail", () => {
            test("Missing", async () => {
                const { thumbnail, ...body } = createValidDestinationData();
                await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
            });
        });
        describe("Invalid values", () => {
            describe("Description", () => {
                test("Missing", async () => {
                    const { description, ...body } = createValidDestinationData();
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Invalid type- string", async () => {
                    const body = createValidDestinationData();
                    body.description = "mldkmaskld " as any;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Invalid type- boolean", async () => {
                    const body = createValidDestinationData();
                    body.description = 12321 as any;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                test("Invalid type- object with invalid syntax", async () => {
                    const body = createValidDestinationData();
                    body.description = {
                        invalid: "syntax",
                    } as any;
                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                });
                describe("Content", () => {
                    describe("Header field", () => {
                        test("Too little", async () => {
                            const body = createValidDestinationData();
                            body.description[0].header = "a";
                            await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                        });
                        test("Too big", async () => {
                            const body = createValidDestinationData();
                            body.description[0].header = VERY_LONG_STRING;
                            await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                        });
                        test("Unexpected syntax", async () => {
                            const body = createValidDestinationData();
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
                            const body = createValidDestinationData();
                            body.description[2].content = "a";
                            await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                        });
                        test("Too big", async () => {
                            const body = createValidDestinationData();
                            body.description[2].content = VERY_LONG_STRING;
                            await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                        });
                        test("Unexpected syntax", async () => {
                            const body = createValidDestinationData();
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
                            const body = createValidDestinationData();
                            body.description[3].url = "description_20";
                            await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                        });
                        test("Unexpected syntax", async () => {
                            const body = createValidDestinationData();
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
                            const body = createValidDestinationData();
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
                                    const body = createValidDestinationData();
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
                                    const body = createValidDestinationData();
                                    body.description[1].left = {
                                        type: FieldType.PARAGRAPH,
                                        content: VERY_LONG_STRING,
                                    };
                                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                                });
                                test("Unexpected syntax", async () => {
                                    const body = createValidDestinationData();
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
                                    const body = createValidDestinationData();
                                    body.description[1].left = {
                                        type: FieldType.IMAGE,
                                        url: "destination_20",
                                        src: null,
                                    };
                                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                                });
                                test("Unexpected syntax", async () => {
                                    const body = createValidDestinationData();
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
                                    const body = createValidDestinationData();
                                    body.description[1].right = {
                                        type: FieldType.PARAGRAPH,
                                        content: "1",
                                    };
                                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                                });
                                test("Too big", async () => {
                                    const body = createValidDestinationData();
                                    body.description[1].right = {
                                        type: FieldType.PARAGRAPH,
                                        content: VERY_LONG_STRING,
                                    };
                                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                                });
                                test("Unexpected syntax", async () => {
                                    const body = createValidDestinationData();
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
                                    const body = createValidDestinationData();
                                    body.description[1].right = {
                                        type: FieldType.IMAGE,
                                        url: "destination_20",
                                        src: null,
                                    };
                                    await expectUnprocessableEntity(body, SheerUser.accessTokenAsCookie as string);
                                });
                                test("Unexpected syntax", async () => {
                                    const body = createValidDestinationData();
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
});
