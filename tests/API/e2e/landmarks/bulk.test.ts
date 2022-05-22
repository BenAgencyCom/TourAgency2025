/**
 * @jest-environment node
 */
// Tools
import prisma from "../../helpers/db";
import makeRequest from "../../helpers/landmarks/bulk/makeRequest";
// "Expectators"
import expectAllAvailabeDataToBeDisplayed from "../../helpers/landmarks/bulk/expectAllAvailabeDataToBeDisplayed";
import expectAllPagesNotToDuplicateData from "../../helpers/landmarks/bulk/expectAllPagesNotToDuplicateData";
// Types
import type { LandmarkType, Continent } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";

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
        test("MUSEUM", async () => {
            const { data } = await makeRequest({
                certainLandmarkType: "MUSEUM",
            });
            expectAllRecordsToHaveTheSameType(data, "MUSEUM");
        });
        test("RESTAURANT", async () => {
            const { data } = await makeRequest({
                certainLandmarkType: "RESTAURANT",
            });
            expectAllRecordsToHaveTheSameType(data, "RESTAURANT");
        });
        test("MONUMENT", async () => {
            const { data } = await makeRequest({
                certainLandmarkType: "MONUMENT",
            });
            expectAllRecordsToHaveTheSameType(data, "MONUMENT");
        });
        test("ANTIQUE", async () => {
            const { data } = await makeRequest({
                certainLandmarkType: "ANTIQUE",
            });
            expectAllRecordsToHaveTheSameType(data, "ANTIQUE");
        });
        test("BUILDING", async () => {
            const { data } = await makeRequest({
                certainLandmarkType: "BUILDING",
            });
            expectAllRecordsToHaveTheSameType(data, "BUILDING");
        });
        test("ART", async () => {
            const { data } = await makeRequest({
                certainLandmarkType: "ART",
            });
            expectAllRecordsToHaveTheSameType(data, "ART");
        });
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
            test("All records should be eventually displayed", async () => {
                const uniqueSlugs: Set<string> = new Set();
                const { data, pagination } = await makeRequest({
                    certainLandmarkType: "BUILDING",
                    perPage: 3,
                    page: 1,
                });
                data.forEach((landmark) => uniqueSlugs.add(landmark.slug));

                for (let page = 2; page <= pagination.pagesInTotal; page++) {
                    const { data } = await makeRequest({
                        certainLandmarkType: "BUILDING",
                        perPage: 3,
                        page,
                    });
                    data.forEach((landmark) => uniqueSlugs.add(landmark.slug));
                }
                const allSlugs = await prisma.landmark.findMany({ where: { type: "BUILDING" }, select: { slug: true } });
                allSlugs
                    .map((el) => el.slug)
                    .forEach((slug) => {
                        expect(uniqueSlugs).toContain(slug);
                    });
            });
        });
    });
    describe("On particular continent", () => {
        test("Asia", async () => {
            const { data } = await makeRequest({
                continent: "Asia",
            });
            expectAllRecordsToBeOnTheSameContinent(data, "Asia");
        });
        test("Europe", async () => {
            const { data } = await makeRequest({
                continent: "Europe",
            });
            expectAllRecordsToBeOnTheSameContinent(data, "Europe");
        });
        test("Africa", async () => {
            const { data } = await makeRequest({
                continent: "Africa",
            });
            expectAllRecordsToBeOnTheSameContinent(data, "Africa");
        });
        test("North_America", async () => {
            const { data } = await makeRequest({
                continent: "North_America",
            });
            expectAllRecordsToBeOnTheSameContinent(data, "North_America");
        });
        test("South_America", async () => {
            const { data } = await makeRequest({
                continent: "South_America",
            });
            expectAllRecordsToBeOnTheSameContinent(data, "South_America");
        });
        test("Australia_Oceania", async () => {
            const { data } = await makeRequest({
                continent: "Australia_Oceania",
            });
            expectAllRecordsToBeOnTheSameContinent(data, "Australia_Oceania");
        });
    });
    describe("Searching phrase", () => {
        describe("In particular city", () => {
            test("Identical city name", async () => {
                const { data } = await makeRequest({
                    searchingPhrase: "Hamburg",
                });
                expect(data.length).toBeGreaterThan(0);
                data.forEach((landmark) => {
                    expect(landmark.destination.city).toEqual("Hamburg");
                });
            });
            test("Partial city name", async () => {
                const { data } = await makeRequest({
                    searchingPhrase: "Ham",
                });
                expect(data.length).toBeGreaterThan(0);
                data.forEach((landmark) => {
                    expect(landmark.destination.city).toEqual("Hamburg");
                });
            });
            test("Uppercased city name", async () => {
                const { data } = await makeRequest({
                    searchingPhrase: "HAMB",
                });
                expect(data.length).toBeGreaterThan(0);
                data.forEach((landmark) => {
                    expect(landmark.destination.city).toEqual("Hamburg");
                });
            });
            test("Lowercased city name", async () => {
                const { data } = await makeRequest({
                    searchingPhrase: "hamburg",
                });
                expect(data.length).toBeGreaterThan(0);
                data.forEach((landmark) => {
                    expect(landmark.destination.city).toEqual("Hamburg");
                });
            });
            test("Irregular cased city name", async () => {
                const { data } = await makeRequest({
                    searchingPhrase: "HaMbURg",
                });
                expect(data.length).toBeGreaterThan(0);
                data.forEach((landmark) => {
                    expect(landmark.destination.city).toEqual("Hamburg");
                });
            });
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
            test("Identical landmark name", async () => {
                const { data } = await makeRequest({
                    searchingPhrase: "Fiction Park",
                });
                expect(data.length).toBeGreaterThan(0);
                data.forEach((landmark) => {
                    expect(landmark.title).toEqual("Fiction Park");
                });
            });
            test("Partial landmark name", async () => {
                const { data } = await makeRequest({
                    searchingPhrase: "Fict",
                });
                expect(data.length).toBeGreaterThan(0);
                data.forEach((landmark) => {
                    expect(landmark.title).toEqual("Fiction Park");
                });
            });
            test("Uppercased landmark name", async () => {
                const { data } = await makeRequest({
                    searchingPhrase: "FICTION PARK",
                });
                expect(data.length).toBeGreaterThan(0);
                data.forEach((landmark) => {
                    expect(landmark.title).toEqual("Fiction Park");
                });
            });
            test("Lowercased landmark name", async () => {
                const { data } = await makeRequest({
                    searchingPhrase: "fiction p",
                });
                expect(data.length).toBeGreaterThan(0);
                data.forEach((landmark) => {
                    expect(landmark.title).toEqual("Fiction Park");
                });
            });
            test("Irregular cased landmark name", async () => {
                const { data } = await makeRequest({
                    searchingPhrase: "FiCTIoN PArK",
                });
                expect(data.length).toBeGreaterThan(0);
                data.forEach((landmark) => {
                    expect(landmark.title).toEqual("Fiction Park");
                });
            });
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
