// Tools
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
import { Conflict, InvalidRequestedBody, Forbidden, NotFound, MethodNotAllowed } from "@/utils/api/Errors";
import FeedbackAPI from "@/utils/api/pages/reviews/ReviewFeedbackAPI";
// Types
import type { NextApiResponse } from "next";
import type { FeedbackRequest } from "./@types";
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";

export default async function handler(req: FeedbackRequest, res: NextApiResponse) {
    try {
        const { authenticatedUserId } = (await GuardedAPIEndpoint(req, "POST", "user")) as GuardedAPIResponse;
        const API = new FeedbackAPI({
            authenticatedUserId,
            elementType: "destination",
            feedbackFromRequest: req.body.feedback,
            idOfReview: req.query.review_id,
        });

        await API.handleRequest();
        return res.status(200).end();
    } catch (e) {
        if (e instanceof InvalidRequestedBody) return res.status(400).json(e.joiFeedback);
        else if (e instanceof Forbidden) return res.status(403).end();
        else if (e instanceof NotFound) return res.status(404).end();
        else if (e instanceof MethodNotAllowed) return res.status(405).end();
        else if (e instanceof Conflict) return res.status(409).end();
        return res.status(500).end();
    }
}
