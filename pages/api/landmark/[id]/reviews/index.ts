// Tools
import BulkReviewsAPI from "@/utils/api/pages/reviews/BulkReviewsAPI";
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
import CreateReviewAPI from "@/utils/api/pages/reviews/CreateReviewAPI";
import { Conflict, InvalidRequestedBody, Forbidden, NotFound } from "@/utils/api/Errors";
// Types
import type { NextApiResponse, NextApiRequest } from "next";
import type { GetBulkReviewsRequest, CreateReviewRequest, DeleteReviewRequest } from "./@types";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = _req;
        //
        // GET: Get bulk reviews associated with single landmark
        //
        if (method === "GET") {
            const request = _req as GetBulkReviewsRequest;
            const ReviewsAPI = new BulkReviewsAPI({ reviewsType: "landmarks", reviewingModelId: request.query.id });
            return res.send(await ReviewsAPI.processComingRequest(request));
        }
        //
        // POST: create new review
        //
        else if (method === "POST") {
            const request = _req as CreateReviewRequest;
            const userId = await GuardedAPIEndpoint(request, "POST", "user");

            const API = new CreateReviewAPI({
                elementType: "landmark",
                idOfElementToAddReview: request.query.id as string,
                userId: userId as string,
            });
            await API.create(request.body);

            return res.status(201).end();
        }

        //
        // PATCH: update currently existing review
        //
        else if (method === "POST") {
            return res.status(200).end();
        }
        //
        // DELETE: delete existing review
        //
        else if (method === "DELETE") {
            return res.status(200).end();
        }
        // Unhandled method request
        throw new NotFound();
    } catch (e) {
        if (e instanceof InvalidRequestedBody) return res.status(400).json(e.joiFeedback);
        else if (e instanceof Forbidden) return res.status(403).end();
        else if (e instanceof NotFound) return res.status(404).end();
        else if (e instanceof Conflict) return res.status(409).end();
        return res.status(500).end();
    }
}
