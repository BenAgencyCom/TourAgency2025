/* eslint-disable import/no-anonymous-default-export */

// Tools
import createRequestWithURLQueries from "../../../createRequestWithURLQueries";
// Types
import type { ReviewType } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";

export interface MakeRequestParams {
    applyPointsDistribution?: "1";
    certianReviewType?: ReviewType;
    sort?: "asc" | "desc";
    orderBy?: "createdAt" | "points";
    page?: number;
    perPage?: number;
}

interface Response {
    reviews: Review[];
    pagination?: PaginationProperties;
}

export default (landmarkID: string) =>
    createRequestWithURLQueries<MakeRequestParams, Response>({
        url: `/api/landmark/${landmarkID}/reviews`,
        possibleURLQueries: ["orderBy", "page", "perPage", "applyPointsDistribution", "certianReviewType", "sort"],
    });
