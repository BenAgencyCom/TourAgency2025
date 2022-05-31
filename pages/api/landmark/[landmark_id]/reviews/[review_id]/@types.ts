// Types
import type { NextApiRequest } from "next";

/** **DELETE** */
export interface DeleteReviewRequest extends NextApiRequest {
    query: {
        review_id: string;
        landmark_id: string;
    };
}
/** **PATCH** */
export interface UpdateReviewRequest extends NextApiRequest {
    query: {
        review_id: string;
        landmark_id: string;
    };
    body: {
        points: number;
        reviewContent: string;
        tags: string[];
    };
}
