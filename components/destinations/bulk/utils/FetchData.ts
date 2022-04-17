// Tools
import axios from "axios";
import { CreateRequestURL } from "./URLBuilder";
// Types
import type { NextRouter } from "next/router";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";

interface RefreshDataParams {
    perPage: number;
    router: NextRouter;
}
interface RefreshDataResponse {
    destinations: Destination[];
    paginationProperties: PaginationProperties;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (params: RefreshDataParams): Promise<RefreshDataResponse | false> => {
    try {
        const URL = CreateRequestURL(params);
        const { data } = await axios.get(URL);
        return {
            destinations: data.destinations,
            paginationProperties: data.pagination,
        };
    } catch (e: any) {
        params.router.push("/500");
        return false;
    }
};
