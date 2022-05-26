// Tools
import createRequestWithURLQueries from "../../createRequestWithURLQueries";
// Types
import type { LandmarkType, Continent } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";

export interface MakeRequestParams {
    certainLandmarkType?: LandmarkType;
    searchingPhrase?: string;
    continent?: Continent;
    order?: "asc" | "desc";
    orderBy?: "createdAt";
    page?: number;
    perPage?: number;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default createRequestWithURLQueries<MakeRequestParams, Landmark>({
    url: "/api/landmark/bulk",
    possibleURLQueries: ["certainLandmarkType", "continent", "order", "searchingPhrase", "orderBy", "page", "perPage"],
});
