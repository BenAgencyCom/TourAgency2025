// Tools
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
import CreateReviewAPI from "@/utils/api/pages/CreateReviewAPI";
import { Conflict, InvalidRequestedBody, Forbidden, NotFound } from "@/utils/api/Errors";
// Tools
import type { NextApiResponse, NextApiRequest } from "next";
// Export this inferface for testing purposes
export interface CreateReviewRequest extends NextApiRequest {
    body: {
        points: number;
        reviewContent: string;
        tags: string[];
    };
}

export default async function handler(req: CreateReviewRequest, res: NextApiResponse) {
    try {
        const userId = await GuardedAPIEndpoint(req, "POST", "user");

        const API = new CreateReviewAPI({
            elementType: "landmark",
            idOfElementToAddReview: req.query.slug as string,
            userId: userId as string,
        });
        await API.create({
            points: req.body.points,
            reviewContent: req.body.reviewContent,
            tags: req.body.tags,
        });

        return res.status(201).end();
    } catch (e: unknown) {
        if (e instanceof Conflict) return res.status(409).end();
        else if (e instanceof Forbidden) return res.status(403).end();
        else if (e instanceof NotFound) return res.status(404).end();
        else if (e instanceof InvalidRequestedBody) return res.status(400).json(e.joiFeedback);
        return res.status(500).end();
    }
}
