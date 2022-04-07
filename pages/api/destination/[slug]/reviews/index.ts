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

        const ReviewsAPI = new BulkReviewsAPI({ reviewsType: "destinations", reviewingModelId: req.query.slug });
        return res.send(await ReviewsAPI.processComingRequest(req));
        //
    } catch (e) {
        if (e instanceof ValidationError) return res.status(422).end();
        return res.status(500).end();
    }
}
