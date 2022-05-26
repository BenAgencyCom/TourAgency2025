/*  eslint-disable import/no-anonymous-default-export */
// Tools
import axios from "axios";
import { API_ADDRESS } from "./db";
// Types
import type { PaginationProperties } from "@/@types/pages/api/Pagination";

interface CreateMakeRequest<URLQueries> {
    /**
     * Example:
     * ```ts
     * url: "/api/landmark/bulk",
     * ```
     */
    url: string;
    /**
     * Example:
     * ```ts
     * possibleURLQueries:["orderBy", "page", "perPage", "applyPointsDistribution", "certianReviewType", "order"]
     * ```
     */
    possibleURLQueries: (keyof URLQueries)[];
}

interface Response<ResponseData> {
    data: ResponseData[];
    pagination: PaginationProperties;
}

/**
 *  The purpose of this function is to reduce inevitable
 *  boilerplate associated with creating every `makeRequest` helper for
 *  each indivitual **API** endpoint. This function returns **async** function which allows
 *  to make all further **API** requests in simple way
 *
 *  ### Params
 *  The function expects one parameter- an object containing following properties:
 *  - `url`- **relative** api url
 *  - `possibleURLQueries`- just an array of keys of `URLQueries` interface
 *
 *  ### Generics:
 *  1. **first generic**- `URLQueries` interface reflecting possible url queries
 *
 *   ```ts
 *   interface URLQueries {
 *       continent?: Continent;
 *       order?: "asc" | "desc";
 *       orderBy?: "createdAt";
 *       page?: number;
 *       perPage?: number;
 *   }
 *   ```
 *  2. **second generic**- `ResponseData` interface reflecting data received from the API
 *
 *   ```ts
 *   interface User {
 *       id: string;
 *       name: string;
 *       surname: string;
 *       job: string;
 *       gender: Gender;
 *   }
 *   ```
 *
 */
export default <URLQueries, ResponseData>(params: CreateMakeRequest<URLQueries>) => {
    const { url: endpointURL, possibleURLQueries } = params;
    // Add slash at the begining of url if is's not present
    const transformedEndpointURL = endpointURL[0] === "/" ? endpointURL : `/${endpointURL}`;
    //
    return async (requestQueries: URLQueries): Promise<Response<ResponseData>> => {
        let url = `${API_ADDRESS}/${transformedEndpointURL}?`;
        possibleURLQueries.forEach((URLQueryName) => {
            if (requestQueries[URLQueryName]) url += `${URLQueryName}=${requestQueries[URLQueryName]}&`;
        });
        const result = await axios.get(url);
        //
        return {
            data: result.data.data,
            pagination: result.data.pagination,
        };
    };
};
