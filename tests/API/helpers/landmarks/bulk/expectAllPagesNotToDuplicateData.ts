/* eslint-disable import/no-anonymous-default-export */
// Tools
import makeRequest from "./makeRequest";
// Types
import type { MakeRequestParams } from "./makeRequest";

interface ExpectAllPagesNotToDuplicateDataParams {
    makeRequestParams: Omit<MakeRequestParams, "page" | "perPage">;
}
/**
 * **Pagination testing function**
 * The purpose of this function is to test all pages and ensure,
 * that EVERY AVAILABLE record is displayed at the end of the day
 */
export default async (params: ExpectAllPagesNotToDuplicateDataParams) => {
    const uniqueSlugs: Set<string> = new Set();
    // Load first page
    const { data, pagination } = await makeRequest({
        ...params.makeRequestParams,
        perPage: 2,
        page: 1,
    });
    data.forEach((landmark) => {
        expect(uniqueSlugs).not.toContain(landmark.slug);
        uniqueSlugs.add(landmark.slug);
    });
    // Load every remaining page
    for (let page = 2; page <= pagination.pagesInTotal; page++) {
        const { data } = await makeRequest({
            ...params.makeRequestParams,
            perPage: 2,
            page,
        });
        data.forEach((landmark) => {
            expect(uniqueSlugs).not.toContain(landmark.slug);
            uniqueSlugs.add(landmark.slug);
        });
    }
};
