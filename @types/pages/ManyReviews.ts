// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { NextApiResponse, NextApiRequest } from "next";

export interface Request extends NextApiRequest {
    query: {
        slug: string;
        page?: string;
        perPage?: string;
    };
}

export interface Response extends NextApiResponse {
    data: {
        reviews: Review[];
        pagination: {
            currentPage: number;
            pagesInTotal: number;
        };
    };
}
