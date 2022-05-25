/**
 * @jest-environment node
 */
// Tools
import prisma from "../../helpers/db";
import MockLandmark from "../../helpers/mocks/MockLandmark";
import MockDestination from "../../helpers/mocks/MockDestination";
import makeRequest from "../../helpers/landmarks/bulk/makeRequest";
// "Expectators"
import expectAllAvailabeDataToBeDisplayed from "../../helpers/landmarks/bulk/expectAllAvailabeDataToBeDisplayed";
import expectAllPagesNotToDuplicateData from "../../helpers/landmarks/bulk/expectAllPagesNotToDuplicateData";
// Types
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";
import type { LandmarkType, Continent, ContentStatus } from "@prisma/client";

const expectAllRecordsToBeApproved = async (data: Landmark[]) => {
    const slugs: string[] = data.map((el) => el.slug);
    const landmarksWithStatus = await prisma.landmark.findMany({ where: { slug: { in: slugs } }, select: { status: true, slug: true } });

    expect(landmarksWithStatus.length).toEqual(data.length);
    data.forEach(({ slug }) => {
        const { status } = landmarksWithStatus.find((target) => target.slug === slug) as { slug: string; status: ContentStatus };
        expect(status).toEqual("APPROVED" as ContentStatus);
    });
};

const expectAllRecordsToHaveTheSameType = (data: Landmark[], type: LandmarkType) => {
    data.forEach((landmark) => {
        expect(landmark.type).toEqual(type);
    });
    expect(data.length).toBeGreaterThan(0);
};

const expectAllRecordsToBeOnTheSameContinent = (data: Landmark[], continent: Continent) => {
    data.forEach((landmark) => {
        expect(landmark.destination.continent).toEqual(continent);
    });
    if (continent !== "Australia_Oceania") expect(data.length).toBeGreaterThan(0);
};

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
                    await mockedLandmark.prepare(mockedDestination.id);

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

        describe("Data can be paginated", () => {
            test("All possible data should be eventually displayed", async () => {
                await expectAllAvailabeDataToBeDisplayed({
                    allSlugsQuery: { type: "BUILDING" },
                    makeRequestParams: { certainLandmarkType: "BUILDING" },
                });
            });
            test("Records do not repeat throughout diffrent pages", async () => {
                await expectAllPagesNotToDuplicateData({
                    makeRequestParams: { certainLandmarkType: "BUILDING" },
                });
            });
        });
    });
    describe("On particular continent", () => {
        const testParticularContinent = (continent: Continent) => {
            describe(continent, () => {
                let data: Landmark[] = [];
                const mockedDestination = new MockDestination({ continent });
                const mockedLandmark = new MockLandmark();
                beforeAll(async () => {
                    const res = await makeRequest({ continent });
                    data = res.data;
                    await mockedDestination.prepare();
                    await mockedLandmark.prepare(mockedDestination.id);
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

        describe("Data can be paginated", () => {
            test("All possible data should be eventually displayed", async () => {
                await expectAllAvailabeDataToBeDisplayed({
                    allSlugsQuery: { destination: { continent: "Europe" } },
                    makeRequestParams: { continent: "Europe" },
                });
            });
            test("Records do not repeat throughout diffrent pages", async () => {
                await expectAllPagesNotToDuplicateData({
                    makeRequestParams: { continent: "Europe" },
                });
            });
        });
    });
    describe("Searching phrase", () => {
        test("Not approved content cannot be displayed", async () => {
            const mockedDestination = new MockDestination();
            const mockedLandmark = new MockLandmark();
            await mockedDestination.prepare();
            await mockedLandmark.prepare(mockedDestination.id);
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

            describe("Data can be paginated", () => {
                test("Data on each page should have the city name", async () => {
                    await expectAllAvailabeDataToBeDisplayed({
                        allSlugsQuery: { destination: { city: "Hamburg" } },
                        makeRequestParams: { searchingPhrase: "Ham" },
                    });
                });
                test("Records do not repeat throughout diffrent pages", async () => {
                    await expectAllPagesNotToDuplicateData({
                        makeRequestParams: { searchingPhrase: "Ham" },
                    });
                });
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

            describe("Data can be paginated", () => {
                test("All possible data should be eventually displayed", async () => {
                    await expectAllAvailabeDataToBeDisplayed({
                        allSlugsQuery: { title: "Fiction Park" },
                        makeRequestParams: { searchingPhrase: "Fictio" },
                    });
                });
                test("Records do not repeat throughout diffrent pages", async () => {
                    await expectAllPagesNotToDuplicateData({
                        makeRequestParams: { searchingPhrase: "Fictio" },
                    });
                });
            });
        });
    });
});
