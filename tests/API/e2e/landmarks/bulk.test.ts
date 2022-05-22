/**
 * @jest-environment node
 */
import makeRequest from "../../data/landmarks/bulk/makeRequest";

describe("GET: api/landmark/bulk", () => {
    describe("Of particular type", () => {
        test("MUSEUM", async () => {
            const { data } = await makeRequest({
                certainLandmarkType: "MUSEUM",
                page: 1,
                perPage: 3,
            });
            data.forEach((landmark) => {
                expect(landmark.type).toEqual("MUSEUM");
            });
        });
        return;
        test("RESTAURANT", async () => {
            //
        });
        test("MONUMENT", async () => {
            //
        });
        test("ANTIQUE", async () => {
            //
        });
        test("BUILDING", async () => {
            //
        });
        test("ART", async () => {
            //
        });
        test("Data can be paginated", async () => {
            //
        });
    });
    return;
    describe("On particular continent", () => {
        test("Asia", async () => {
            //
        });
        test("Europe", async () => {
            //
        });
        test("Africa", async () => {
            //
        });
        test("North_America", async () => {
            //
        });
        test("South_America", async () => {
            //
        });
        test("Australia_Oceania", async () => {
            //
        });
        test("Antarctica", async () => {
            //
        });
    });
    describe("Searching phrase", () => {
        describe("In particular city", () => {
            test("Identical city name", async () => {
                //
            });
            test("Partial city name", async () => {
                //
            });
            test("Uppercased city name", async () => {
                //
            });
            test("Lowercased city name", async () => {
                //
            });
            test("Irregular cased city name", async () => {
                //
            });
            test("Data can be paginated", async () => {
                //
            });
        });
        describe("Specific landmark", () => {
            test("Identical landmark name", async () => {
                //
            });
            test("Partial landmark name", async () => {
                //
            });
            test("Uppercased landmark name", async () => {
                //
            });
            test("Lowercased landmark name", async () => {
                //
            });
            test("Irregular cased landmark name", async () => {
                //
            });
            test("Data can be paginated", async () => {
                //
            });
        });
    });
});
