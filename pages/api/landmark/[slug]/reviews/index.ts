// Tools
import { prisma } from "@/prisma/db";
import BulkReviewsAPI from "@/utils/api/pages/BulkReviewsAPI";
import { ValidationError, NotFound } from "@/utils/api/Errors";
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
        // ensure that landmark with given id exists
        const landmark = await prisma.landmark.findUnique({ where: { id: req.query.slug }, select: { status: true } });
        if (!landmark || landmark.status !== "APPROVED") throw new NotFound();
        //
        const ReviewsAPI = new BulkReviewsAPI({ reviewsType: "landmarks", reviewingModelId: req.query.slug });
        return res.send(await ReviewsAPI.processComingRequest(req));
    } catch (e) {
        if (e instanceof ValidationError) return res.status(422).end();
        else if (e instanceof NotFound) return res.status(404).end();
        return res.status(500).end();
    }
}
