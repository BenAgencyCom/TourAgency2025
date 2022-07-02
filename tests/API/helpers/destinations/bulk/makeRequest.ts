// Tools
import createRequestWithURLQueries from "../../createRequestWithURLQueries";
// Types
import type { Continent } from "@prisma/client";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";

export interface MakeRequestParams {
    searchingPhrase?: string;
    continent?: Continent;
    sort?: "asc" | "desc";
    orderBy?: "createdAt";
    page?: number;
    perPage?: number;
}

export interface Response {
    data: Destination[];
    pagination: PaginationProperties;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default createRequestWithURLQueries<MakeRequestParams, Response>({
    url: "/api/destination/bulk",
    possibleURLQueries: ["continent", "sort", "searchingPhrase", "orderBy", "page", "perPage"],
});
