/**
 * @jest-environment node
 */
// Tools
import prisma from "@/tests/API/helpers/db";
import MockLandmark from "@/tests/API/helpers/mocks/MockLandmark";
import MockDestination from "@/tests/API/helpers/mocks/MockDestination";
import makeRequest from "@/tests/API/helpers/landmarks/bulk/makeRequest";
// "Expectators"
import testPaginations from "@/tests/API/helpers/testPagination";
import expectAllRecordsToBeApproved from "@/tests/API/helpers/landmarks/bulk/expectAllRecordsToBeApproved";
import expectAllRecordsToHaveTheSameType from "@/tests/API/helpers/landmarks/bulk/expectAllRecordsToHaveTheSameType";
import expectAllRecordsToBeOnTheSameContinent from "@/tests/API/helpers/landmarks/bulk/expectAllRecordsToBeOnTheSameContinent";
// Types
import type { LandmarkType, Continent } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";

const RECORDS_PER_PAGE: number[] = [2, 4, 6, 9, 12, 16];

describe("GET: api/landmark/bulk", () => {
    describe("Of particular type", () => {
        const testParticularType = (type: LandmarkType) => {
            describe(type, () => {
                // Mocked records
                const mockedDestination = new MockDestination();
                const mockedLandmark = new MockLandmark({ type });
                //
                let data: Landmark[] = [];
                beforeAll(async () => {
                    // Create mocked landmark, just for the sake of testing.
                    await mockedDestination.prepare();
                    await mockedLandmark.prepare(mockedDestination.id as string);

                    const res = await makeRequest({
                        certainLandmarkType: type,
                    });
                    data = res.data;
                });
                afterAll(async () => {
                    // It is not neccesary to remove mockedLandmark, due to the
                    // CASCADE relation between landmark and destination models
                    await mockedDestination.remove();
                });

                test("All records have the same type", () => {
                    expectAllRecordsToHaveTheSameType(data, type);
                });
                test("All results are APPROVED", async () => {
                    await expectAllRecordsToBeApproved(data);
                });
            });
        };

        const ALL_TYPES: LandmarkType[] = ["ANTIQUE", "ART", "BUILDING", "MONUMENT", "MUSEUM", "NATURE", "RESTAURANT"];
        for (const type of ALL_TYPES) {
            testParticularType(type);
        }

        testPaginations({
            uniquePropertyName: "slug",
            recordsPerPage: RECORDS_PER_PAGE,
            getAllAvailableData: async () =>
                await prisma.landmark.findMany({
                    where: {
                        type: "BUILDING",
                    },
                    select: {
                        slug: true,
                    },
                }),
            loadPage: async (page: number, perPage: number) =>
                await makeRequest({
                    certainLandmarkType: "BUILDING",
                    page,
                    perPage,
                }),
        });
    });
    describe("On particular continent", () => {
        const testParticularContinent = (continent: Continent) => {
            describe(continent, () => {
                let data: Landmark[] = [];
                const mockedDestination = new MockDestination();
                const mockedLandmark = new MockLandmark();
                beforeAll(async () => {
                    const res = await makeRequest({ continent });
                    data = res.data;
                    await mockedDestination.prepare({ continent });
                    await mockedLandmark.prepare(mockedDestination.id as string);
                });
                afterAll(async () => {
                    // It is not neccesary to remove mockedLandmark, due to the
                    // CASCADE relation between landmark and destination models
                    await mockedDestination.remove();
                });

                test("All records are on the same continent", () => {
                    expectAllRecordsToBeOnTheSameContinent(data, continent);
                });
                test("All results are APPROVED", async () => {
                    await expectAllRecordsToBeApproved(data);
                });
            });
        };

        const ALL_CONTINENTS: Continent[] = ["Africa", "Asia", "Australia_Oceania", "Europe", "North_America", "South_America"];
        for (const continent of ALL_CONTINENTS) {
            testParticularContinent(continent);
        }

        testPaginations({
            recordsPerPage: RECORDS_PER_PAGE,
            uniquePropertyName: "slug",
            getAllAvailableData: async () =>
                await prisma.landmark.findMany({
                    where: {
                        destination: {
                            continent: "Europe",
                        },
                    },
                    select: {
                        slug: true,
                    },
                }),
            loadPage: async (page: number, perPage: number) =>
                await makeRequest({
                    continent: "Europe",
                    page,
                    perPage,
                }),
        });
    });
    describe("Searching phrase", () => {
        test("Not approved content cannot be displayed", async () => {
            const mockedDestination = new MockDestination();
            const mockedLandmark = new MockLandmark({ status: "WAITING_FOR_APPROVAL" });
            await mockedDestination.prepare();
            await mockedLandmark.prepare(mockedDestination.id as string);
            //
            const res = await makeRequest({ searchingPhrase: mockedLandmark.title });
            expect(res.data).toHaveLength(0);

            // It is not neccesary to remove mockedLandmark, due to the
            // CASCADE relation between landmark and destination models
            await mockedDestination.remove();
        });

        describe("In particular city", () => {
            const testLandmarksInParticualCity = (label: string, searchingPhrase: string) => {
                describe(label, () => {
                    let data: Landmark[] = [];
                    beforeAll(async () => {
                        const res = await makeRequest({ searchingPhrase });
                        data = res.data;
                        expect(data.length).toBeGreaterThan(0);
                    });

                    test("All records are in expected city", () => {
                        data.forEach((landmark) => {
                            expect(landmark.destination.city).toEqual("Hamburg");
                        });
                    });
                    test("All results are APPROVED", async () => {
                        await expectAllRecordsToBeApproved(data);
                    });
                });
            };

            testLandmarksInParticualCity("Identical city name", "Hamburg");
            testLandmarksInParticualCity("Partial city name", "Ham");
            testLandmarksInParticualCity("Uppercased city name", "HAMB");
            testLandmarksInParticualCity("Lowercased city name", "hambur");
            testLandmarksInParticualCity("Irregular cased city name", "HaMbURg");

            testPaginations({
                uniquePropertyName: "slug",
                recordsPerPage: RECORDS_PER_PAGE,
                getAllAvailableData: async () =>
                    await prisma.landmark.findMany({
                        where: {
                            destination: {
                                city: "Hamburg",
                            },
                        },
                        select: {
                            slug: true,
                        },
                    }),
                loadPage: async (page: number, perPage: number) =>
                    await makeRequest({
                        searchingPhrase: "Ham",
                        page,
                        perPage,
                    }),
            });
        });

        describe("Specific landmark", () => {
            const testOnlyOneSpecificLandmark = (label: string, searchingPhrase: string) => {
                describe(label, () => {
                    let data: Landmark[] = [];
                    beforeAll(async () => {
                        const res = await makeRequest({ searchingPhrase });
                        data = res.data;
                        expect(data.length).toBeGreaterThan(0);
                    });

                    test("The only result is an expected landmark", () => {
                        data.forEach((landmark) => {
                            expect(landmark.title).toEqual("Fiction Park");
                        });
                        expect(data).toHaveLength(1);
                    });
                    test("All results are APPROVED", async () => {
                        await expectAllRecordsToBeApproved(data);
                    });
                });
            };
            testOnlyOneSpecificLandmark("Identical landmark name", "Fiction Park");
            testOnlyOneSpecificLandmark("Partial landmark name", "Ficti");
            testOnlyOneSpecificLandmark("Uppercased landmark name", "FICTION PARK");
            testOnlyOneSpecificLandmark("Lowercased landmark name", "fiction p");
            testOnlyOneSpecificLandmark("Irregular cased landmark name", "FiCTIoN PArK");
        });
    });
});
