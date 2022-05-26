/* eslint-disable import/no-anonymous-default-export */
import type { PaginationProperties } from "@/@types/pages/api/Pagination";

type PieceOfData = {
    slug: string;
};

interface TestPaginationParams {
    /**
     * **ASYNC** callback returning a dataset in which each record has a `SLUG` property
     * ---
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
    getAllAvailableData: () => Promise<(Record<any, any> & PieceOfData)[]>;
    /**
     * **ASYNC** callback returning data on particular page. This function accepts one parameter-
     * the number of page to load data from.
     * ---
     * ```ts
     * async (page: number) =>
     *      await makeRequest({
     *          certainLandmarkType: "BUILDING",
     *          page,
     *          perPage: 2,
     *      }),
     * ```
     */
    loadPage: (page: number) => Promise<{
        data: { slug: string }[];
        pagination: PaginationProperties;
    }>;
}
/**
 * **Pagination testing function**
 * The purpose of this function is to test all pages and ensure,
 * that **every** available record is displayed and no records are repeating
 * throughout different pages
 * ---
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
 *      loadPage: async (page: number) =>
 *          await makeRequest({
 *              certainLandmarkType: "BUILDING",
 *              page,
 *              perPage: 2,
 *          }),
 *  });
 *
 * ```
 */
export default (params: TestPaginationParams) => {
    const { getAllAvailableData, loadPage } = params;

    describe("Data can be paginated", () => {
        test("All possible data should be eventually displayed", async () => {
            const uniqueSlugs: Set<string> = new Set();
            const { data, pagination } = await loadPage(1);
            const allAvailableData = await getAllAvailableData();

            const storeAllIDs = (data: PieceOfData[]) => data.forEach((el: PieceOfData) => uniqueSlugs.add(el.slug));
            //
            storeAllIDs(data);
            // Load all remaining pages
            for (let page = 2; page <= pagination.pagesInTotal; page++) {
                const { data } = await loadPage(page);
                storeAllIDs(data);
            }

            expect(allAvailableData).toHaveLength(uniqueSlugs.size);
            allAvailableData.forEach((el) => {
                expect(uniqueSlugs).toContain(el.slug);
            });
        });
        test("Records do not repeat throughout diffrent pages", async () => {
            const uniqueSlugs: Set<string> = new Set();
            const { data, pagination } = await loadPage(1);
            const allAvailableData = await getAllAvailableData();

            data.forEach((el: PieceOfData) => uniqueSlugs.add(el.slug));
            // Load all remaining pages
            for (let page = 2; page <= pagination.pagesInTotal; page++) {
                const { data } = await loadPage(page);
                data.forEach((el: PieceOfData) => {
                    expect(uniqueSlugs).not.toContain(el.slug);
                    uniqueSlugs.add(el.slug);
                });
            }

            expect(allAvailableData).toHaveLength(uniqueSlugs.size);
            allAvailableData.forEach((el) => {
                expect(uniqueSlugs).toContain(el.slug);
            });
        });
    });
};
