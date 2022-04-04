// Tools
import axios from "axios";
import { CreateRequestURL, UpdateCurrentURLsQueries } from "./URLBuilder";
// Types
import type { NextRouter } from "next/router";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { ReviewsCallResponse, Review } from "@/@types/pages/api/ReviewsAPI";

interface RefreshDataParams {
    destinationID: string;
    perPage: number;
    router: NextRouter;
    page?: number;
}
interface RefreshDataResponse {
    reviews: Review[];
    paginationProperties: PaginationProperties;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (params: RefreshDataParams): Promise<RefreshDataResponse | false> => {
    try {
        const { destinationID, perPage, router, page } = params;
        if (page) router.query.page = String(page);

        UpdateCurrentURLsQueries(router);
        const URL = CreateRequestURL({
            destinationId: destinationID,
            perPage: perPage,
            page: page ?? 1,
            type: router.query.type,
            order: router.query.order,
        });

        const { data }: { data: ReviewsCallResponse } = await axios.get(URL);

        return {
            reviews: data.reviews as Review[],
            paginationProperties: data.pagination as PaginationProperties,
        };
    } catch (e: any) {
        params.router.push("/500");
        return false;
    }
};
