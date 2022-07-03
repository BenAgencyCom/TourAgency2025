// Types
import type { NextApiRequest } from "next";
import type { ReviewType } from "@prisma/client";
import type { OrderBy, Sort } from "@/@types/pages/api/ReviewsAPI";

/** **GET** */
export interface GetBulkReviewsRequest extends NextApiRequest {
    query: {
        destination_id: string;
        orderBy?: OrderBy;
        sort?: Sort;
        page?: string;
        perPage?: string;
        applyPointsDistribution?: string;
        certianReviewType?: ReviewType;
    };
}
/** **POST** */
export interface CreateReviewRequest extends NextApiRequest {
    query: {
        destination_id: string;
    };
    body: {
        points: number;
        reviewContent: string;
        tags: string[];
    };
}
