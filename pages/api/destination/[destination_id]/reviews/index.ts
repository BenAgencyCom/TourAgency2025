// Tools
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
import BulkReviewsAPI from "@/utils/api/pages/reviews/BulkReviewsAPI";
import CreateReviewAPI from "@/utils/api/pages/reviews/CreateReviewAPI";
import { Conflict, InvalidRequestedBody, Forbidden, NotFound, MethodNotAllowed } from "@/utils/api/Errors";
// Types
import type { NextApiResponse, NextApiRequest } from "next";
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";
import type { GetBulkReviewsRequest, CreateReviewRequest } from "./@types";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = _req;
        //
        // GET: Get bulk reviews associated with single destination
        //
        if (method === "GET") {
            const request = _req as GetBulkReviewsRequest;
            const ReviewsAPI = new BulkReviewsAPI({ reviewsType: "destinations", reviewingModelId: request.query.destination_id });
            return res.send(await ReviewsAPI.processComingRequest(request));
        }
        //
        // POST: create new review
        //
        else if (method === "POST") {
            const request = _req as CreateReviewRequest;
            const { authenticatedUserId } = (await GuardedAPIEndpoint(request, "POST", "user")) as GuardedAPIResponse;

            const API = new CreateReviewAPI({
                elementType: "destination",
                idOfElementToAddReview: request.query.destination_id,
                userId: authenticatedUserId,
            });

            return res.status(201).send(await API.create(request.body));
        }
        // Unhandled method request
        throw new MethodNotAllowed();
    } catch (e) {
        if (e instanceof InvalidRequestedBody) return res.status(400).json(e.joiFeedback);
        else if (e instanceof Forbidden) return res.status(403).end();
        else if (e instanceof NotFound) return res.status(404).end();
        else if (e instanceof MethodNotAllowed) return res.status(405).end();
        else if (e instanceof Conflict) return res.status(409).end();
        return res.status(500).end();
    }
}
