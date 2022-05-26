/* eslint-disable import/no-anonymous-default-export */
import type { PaginationProperties } from "@/@types/pages/api/Pagination";

interface TestPaginationParams {
    /**
     * Async callback returning all posible data of this collection
     * ```ts
     *  async () =>
     *      await prisma.landmark.findMany({
     *          where: {
     *              type: "BUILDING",
     *          },
     *          select: {
     *              slug: true,
     *          },
     *      }),
     * ```
     */
    getAllAvailableData: () => Promise<Record<any, any>[]>;
    /**
     * **ASYNC** callback returning data on particular page. This function accepts one parameter-
     * the number of page to load data from.
     * ```ts
     * async (page: number, perPage:number) =>
     *      await makeRequest({
     *          certainLandmarkType: "BUILDING",
     *          page,
     *          perPage,
     *      }),
     * ```
     */
    loadPage: (
        page: number,
        perPage: number
    ) => Promise<{
        data: any[];
        pagination: PaginationProperties;
    }>;
    /** Something unique differentiating each individual record */
    uniquePropertyName?: string;
    /** Array containging numbers of records per page to test */
    recordsPerPage: number[];
    /**
     * Array of additional tests which will run besides two basic pagination test
     */
    additionalTests?: {
        /** Name of the test- this will be displayed in the terminal */
        name: string;
        /** Callback accepting one parameter- data comming from the API request */
        cb: (data: any[]) => Promise<void>;
    }[];
}
/**
 * **Pagination testing function**
 * The purpose of this function is to test all pages and ensure,
 * that **every** available record is displayed and no records are repeating
 * throughout different pages
 *
 * ```ts
 *  testPaginations({
 *      getAllAvailableData: async () =>
 *          await prisma.landmark.findMany({
 *              where: {
 *                  type: "BUILDING",
 *              },
 *              select: {
 *                  slug: true,
 *              },
 *          }),
 *      loadPage: async (page: number, perPage:number) =>
 *          await makeRequest({
 *              certainLandmarkType: "BUILDING",
 *              page,
 *              perPage,
 *          }),
 *  });
 *
 * ```
 */
export default (params: TestPaginationParams) => {
    const { getAllAvailableData, loadPage: _loadPage, uniquePropertyName: _uniquePropertyName, recordsPerPage, additionalTests } = params;
    const uniquePropertyName = _uniquePropertyName ?? "slug";
    /**
     * Just a shourtcut for `(el as any)[uniqueProperty]`
     */
    const getUniquePropery = (el: any) => el[uniquePropertyName];

    describe("Data can be paginated", () => {
        for (const perPage of recordsPerPage) {
            const loadPage = async (page: number) => await _loadPage(page, perPage);

            describe(`${perPage} records per page`, () => {
                test("All possible data should be eventually displayed", async () => {
                    const uniquePropertyCollection: Set<string> = new Set();
                    const { data, pagination } = await loadPage(1);
                    const allAvailableData = await getAllAvailableData();

                    const storeAllIDs = (data: any[]) => {
                        for (const el of data) uniquePropertyCollection.add(getUniquePropery(el));
                    };
                    storeAllIDs(data);

                    for (let page = 2; page <= pagination.pagesInTotal; page++) {
                        const { data } = await loadPage(page);
                        storeAllIDs(data);
                    }

                    expect(allAvailableData).toHaveLength(uniquePropertyCollection.size);
                    allAvailableData.forEach((el) => {
                        expect(uniquePropertyCollection).toContain(el[uniquePropertyName]);
                    });
                });
                test("Records do not repeat throughout diffrent pages", async () => {
                    const uniquePropertyCollection: Set<string> = new Set();
                    const allAvailableData = await getAllAvailableData();
                    const { data, pagination } = await loadPage(1);

                    data.forEach((el) => {
                        uniquePropertyCollection.add(getUniquePropery(el));
                    });

                    for (let page = 2; page <= pagination.pagesInTotal; page++) {
                        const { data } = await loadPage(page);
                        data.forEach((el) => {
                            expect(uniquePropertyCollection).not.toContain(getUniquePropery(el));
                            uniquePropertyCollection.add(getUniquePropery(el));
                        });
                    }

                    expect(allAvailableData).toHaveLength(uniquePropertyCollection.size);
                    allAvailableData.forEach((el) => {
                        expect(uniquePropertyCollection).toContain(getUniquePropery(el));
                    });
                });

                if (additionalTests) {
                    for (const additionalTest of additionalTests) {
                        test(additionalTest.name, async () => {
                            const { data, pagination } = await loadPage(1);
                            await additionalTest.cb(data);
                            for (let page = 2; page <= pagination.pagesInTotal; page++) {
                                const { data } = await loadPage(page);
                                await additionalTest.cb(data);
                            }
                        });
                    }
                }
            });
        }
    });
};
