// Tools
import { ValidationError } from "@/utils/api/Errors";
import BulkReviewsAPI from "@/utils/api/pages/BulkReviewsAPI";
// Types
import type { ReviewType } from "@prisma/client";
import type { NextApiResponse, NextApiRequest } from "next";
import type { OrderBy, Sort } from "@/@types/pages/api/ReviewsAPI";

interface Request extends NextApiRequest {
    query: {
        slug: string;
        orderBy?: OrderBy;
        sort?: Sort;
        page?: string;
        perPage?: string;
        applyPointsDistribution?: string;
        certianReviewType?: ReviewType;
    };
}

export default async function handler(req: Request, res: NextApiResponse) {
    try {
        if (req.method !== "GET") return res.status(404).end();

        const { orderBy, sort, page, perPage, applyPointsDistribution, certianReviewType } = req.query;
        if (!page || !perPage) return res.status(400).end();

        const ReviewsAPI = new BulkReviewsAPI({ reviewsType: "destinations", reviewingModelId: req.query.slug });
        const result = await ReviewsAPI.call({
            orderBy: orderBy,
            page: Number(page),
            perPage: Number(perPage),
            sort: sort,
            certianReviewType: certianReviewType,
        });

        if (!result.reviews.length) return res.status(404).end();
        if (applyPointsDistribution) {
            const pointsDistribution = await ReviewsAPI.pointsDistribution();
            const statistics = await ReviewsAPI.aggregate({ count: true, avgScore: true });

            return res.send({
                ...result,
                pointsDistribution,
                statistics: {
                    recordsInTotal: statistics.count as number,
                    averageScore: statistics.avgScore as number,
                },
            });
        }

        return res.send(result);
    } catch (e) {
        if (e instanceof ValidationError) return res.status(422).end();
        return res.status(500).end();
    }
}
