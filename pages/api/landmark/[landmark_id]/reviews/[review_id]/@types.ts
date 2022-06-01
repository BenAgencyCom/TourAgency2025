// Types
import type { NextApiRequest } from "next";
import type { Feedback } from "@prisma/client";

/** /feedback **POST** */
export interface FeedbackRequest extends NextApiRequest {
    body: {
        feedback: Feedback;
    };
    query: {
        review_id: string;
        landmark_id: string;
    };
}

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
