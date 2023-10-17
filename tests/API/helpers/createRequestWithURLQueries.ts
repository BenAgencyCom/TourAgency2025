/*  eslint-disable import/no-anonymous-default-export */
// Tools
import axios from "axios";
import { API_ADDRESS } from "./db";

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
 *   interface Response {
 *       data: Landmark[];
 *       pagination: PaginationProperties;
 *   }
 *   ```
 *
 */
export default <URLQueries, Response>(params: CreateMakeRequest<URLQueries>) => {
    const { url: endpointURL, possibleURLQueries } = params;
    // Add slash at the begining of url if is's not present
    const transformedEndpointURL = endpointURL[0] === "/" ? endpointURL : `/${endpointURL}`;
    //
    return async (requestQueries: URLQueries, Cookie: string = ""): Promise<Response> => {
        let url = `${API_ADDRESS}/${transformedEndpointURL}?`;
        possibleURLQueries.forEach((URLQueryName) => {
            if (requestQueries[URLQueryName]) url += `${String(URLQueryName)}=${requestQueries[URLQueryName]}&`;
        });
        const { data } = await axios.get(url, {
            headers: {
                Cookie,
            },
        });
        //
        return data;
    };
};
