// Tools
import axios from "axios";
// Types
import type { LandmarkType, Continent } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";

const API_URL = "http://localhost:3000/api/landmark/bulk";
const POSSIBLE_PARAMS: (keyof MakeRequestParams)[] = ["certainLandmarkType", "continent", "order", "searchingPhrase", "orderBy", "page", "perPage"];

export interface MakeRequestParams {
    certainLandmarkType?: LandmarkType;
    searchingPhrase?: string;
    continent?: Continent;
    order?: "asc" | "desc";
    orderBy?: "createdAt";
    page?: number;
    perPage?: number;
}

interface Response {
    data: Landmark[];
    pagination: PaginationProperties;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (params: MakeRequestParams): Promise<Response> => {
    let url = `${API_URL}?`;
    POSSIBLE_PARAMS.forEach((prop) => {
        if (params[prop]) url += `${prop}=${params[prop]}&`;
    });
    const result = await axios.get(url);
    //
    return {
        data: result.data.data,
        pagination: result.data.pagination,
    };
};
