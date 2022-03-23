// Tools
import BulkReviewsAPI from "@/utils/api/pages/BulkReviewsAPI";
import { ValidationError } from "@/utils/api/Errors";
// Types
import type { NextApiResponse, NextApiRequest } from "next";
import type { OrderBy, Sort } from "@/@types/pages/api/ReviewsAPI";

interface Request extends NextApiRequest {
    query: {
        slug: string;
        orderBy?: OrderBy;
        sort?: Sort;
        page?: string;
        perPage?: string;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    try {
        if (req.method !== "GET") return res.status(404).end();

        const { orderBy, sort, page, perPage } = req.query;
        if (!page || !perPage) return res.status(400).end();

        const ReviewsAPI = new BulkReviewsAPI({ reviewsType: "destinations", reviewingModelId: req.query.slug });
        const result = await ReviewsAPI.call({
            orderBy: orderBy,
            page: Number(page),
            perPage: Number(perPage),
            sort: sort,
        });

        if (result.reviews.length) return res.send(result);
        return res.status(404).end();
    } catch (e) {
        if (e instanceof ValidationError) return res.status(422).end();
        return res.status(500).end();
    }
}
