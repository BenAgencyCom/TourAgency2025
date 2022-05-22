/* eslint-disable import/no-anonymous-default-export */
// Tools
import prisma from "../../db";
import makeRequest from "./makeRequest";
// Types
import { Prisma } from "@prisma/client";
import type { MakeRequestParams } from "./makeRequest";

interface ExpectAllAvailabeDataToBeDisplayedParams {
    makeRequestParams: Omit<MakeRequestParams, "page" | "perPage">;
    allSlugsQuery: Prisma.LandmarkWhereInput;
}
/**
 * **Pagination testing function**
 * The purpose of this function is to test all pages and ensure,
 * that each of them contain only records with specified piece of data
 */
export default async (params: ExpectAllAvailabeDataToBeDisplayedParams) => {
    const uniqueSlugs: Set<string> = new Set();
    // Load first page
    const { data, pagination } = await makeRequest({
        ...params.makeRequestParams,
        perPage: 2,
        page: 1,
    });
    data.forEach((landmark) => uniqueSlugs.add(landmark.slug));
    // Load every remaining page
    for (let page = 2; page <= pagination.pagesInTotal; page++) {
        const { data } = await makeRequest({
            ...params.makeRequestParams,
            perPage: 2,
            page,
        });
        data.forEach((landmark) => uniqueSlugs.add(landmark.slug));
    }
    //
    const allSlugs = await prisma.landmark.findMany({ where: params.allSlugsQuery, select: { slug: true } });
    expect(allSlugs.length).toEqual(uniqueSlugs.size);
    allSlugs
        .map((el) => el.slug)
        .forEach((slug) => {
            expect(uniqueSlugs).toContain(slug);
        });
};
