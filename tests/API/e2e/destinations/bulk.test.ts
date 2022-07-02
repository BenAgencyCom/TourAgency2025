/**
 * @jest-environment node
 */
import prisma from "@/tests/API/helpers/db";
import MockDestination from "@/tests/API/helpers/mocks/MockDestination";
import makeRequest from "@/tests/API/helpers/destinations/bulk/makeRequest";
// "Expectators"
import testPaginations from "@/tests/API/helpers/testPagination";
import expectAllRecordsToBeApproved from "@/tests/API/helpers/destinations/bulk/expectAllRecordsToBeApproved";
import expectAllRecordsToBeOnTheSameContinent from "@/tests/API/helpers/destinations/bulk/expectAllRecordsToBeOnTheSameContinent";
// Types
import type { Continent } from "@prisma/client";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";

const RECORDS_PER_PAGE: number[] = [2, 4, 6, 9, 12, 16];

describe("GET: api/destination/bulk", () => {
    test("Not approved content cannot be displayed", async () => {
        const mockedDestination = new MockDestination();
        await mockedDestination.prepare({ status: "WAITING_FOR_APPROVAL" });
        //
        const res = await makeRequest({ searchingPhrase: mockedDestination.city as string });
        expect(res.data).toHaveLength(0);

        // It is not neccesary to remove mockedLandmark, due to the
        // CASCADE relation between landmark and destination models
        await mockedDestination.remove();
    });
    describe("On particular continent", () => {
        const testParticularContinent = (continent: Continent) => {
            describe(continent, () => {
                let data: Destination[] = [];
                const mockedDestination = new MockDestination();

                beforeAll(async () => {
                    const res = await makeRequest({ continent });
                    data = res.data;
                    await mockedDestination.prepare({ continent });
                });
                afterAll(async () => {
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
                await prisma.destination.findMany({
                    where: {
                        continent: "Europe",
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
        describe("In particular city", () => {
            const testLandmarksInParticualCity = (label: string, searchingPhrase: string) => {
                describe(label, () => {
                    let data: Destination[] = [];
                    beforeAll(async () => {
                        const res = await makeRequest({ searchingPhrase });
                        data = res.data;
                        expect(data.length).toBeGreaterThan(0);
                    });

                    test("All records are in expected city", () => {
                        data.forEach((destination) => {
                            expect(destination.city).toEqual("Hamburg");
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
                    await prisma.destination.findMany({
                        where: {
                            city: "Hamburg",
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

        describe("In specific country", () => {
            const testOnlyOneSpecificLandmark = (label: string, searchingPhrase: string) => {
                describe(label, () => {
                    let data: Destination[] = [];
                    beforeAll(async () => {
                        const res = await makeRequest({ searchingPhrase });
                        data = res.data;
                        expect(data.length).toBeGreaterThan(0);
                    });

                    test("All records are in expect country", () => {
                        data.forEach((destination) => {
                            expect(destination.country).toEqual("Germany");
                        });
                        expect(data).toHaveLength(1);
                    });
                    test("All results are APPROVED", async () => {
                        await expectAllRecordsToBeApproved(data);
                    });
                });
            };
            testOnlyOneSpecificLandmark("Identical country name", "Germany");
            testOnlyOneSpecificLandmark("Partial country name", "Germa");
            testOnlyOneSpecificLandmark("Uppercased country name", "GERMANY");
            testOnlyOneSpecificLandmark("Lowercased country name", "germ");
            testOnlyOneSpecificLandmark("Irregular cased country name", "gERmaNY");
        });
    });
});
