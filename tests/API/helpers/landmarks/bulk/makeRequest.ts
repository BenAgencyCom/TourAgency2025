// Tools
import createRequestWithURLQueries from "../../createRequestWithURLQueries";
// Types
import type { LandmarkType, Continent } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";

export interface MakeRequestParams {
    certainLandmarkType?: LandmarkType;
    searchingPhrase?: string;
    continent?: Continent;
    sort?: "asc" | "desc";
    orderBy?: "createdAt";
    page?: number;
    perPage?: number;
}

export interface Response {
    data: Landmark[];
    pagination: PaginationProperties;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default createRequestWithURLQueries<MakeRequestParams, Response>({
    url: "/api/landmark/bulk",
    possibleURLQueries: ["certainLandmarkType", "continent", "sort", "searchingPhrase", "orderBy", "page", "perPage"],
});
