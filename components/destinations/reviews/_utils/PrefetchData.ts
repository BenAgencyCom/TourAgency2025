// Tools
import axios from "axios";
import { NotFound } from "@/utils/api/Errors";
import { CreateRequestURL } from "./URLBuilder";
// Types
import type { NextRouter } from "next/router";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { ReviewsCallResponse, Review, PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";

interface PrefetchDataParams {
    destinationID: string;
    perPage: number;
    router: NextRouter;
}
interface PrefetchDataResponse {
    reviews: Review[];
    paginationProperties: PaginationProperties;
    statistics: Statistics;
    pointsDistribution: PointsDistribution;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (params: PrefetchDataParams): Promise<PrefetchDataResponse | false> => {
    try {
        const { destinationID, perPage, router } = params;

        const URL = CreateRequestURL({
            destinationId: destinationID,
            perPage: perPage,
            page: router.query.page ? Number(router.query.page) : 1,
            type: router.query.type,
            pointsDistribution: true,
            order: router.query.order,
        });

        const { data }: { data: ReviewsCallResponse } = await axios.get(URL);
        if (!data.reviews.length) throw new NotFound();

        return {
            reviews: data.reviews as Review[],
            paginationProperties: data.pagination as PaginationProperties,
            pointsDistribution: data.pointsDistribution as PointsDistribution,
            statistics: data.statistics as Statistics,
        };
    } catch (e: any) {
        if (e instanceof NotFound) params.router.push("/404");
        else params.router.push("/500");

        return false;
    }
};
