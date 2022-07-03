// Tools
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
import DeleteReviewAPI from "@/utils/api/pages/reviews/DeleteReviewAPI";
import UpdateReviewAPI from "@/utils/api/pages/reviews/UpdateReviewAPI";
import { Conflict, InvalidRequestedBody, Forbidden, NotFound, MethodNotAllowed } from "@/utils/api/Errors";
// Types
import type { NextApiResponse, NextApiRequest } from "next";
import type { DeleteReviewRequest, UpdateReviewRequest } from "./@types";
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = _req;
        //
        // DELETE: delete existing review
        //
        if (method === "DELETE") {
            const request = _req as DeleteReviewRequest;

            const API = new DeleteReviewAPI({
                authenticationResponse: (await GuardedAPIEndpoint(request, "DELETE", "user")) as GuardedAPIResponse,
                elementType: "destination",
                idOfReview: request.query.review_id,
                idOfElementAssociatedWithReview: request.query.destination_id,
            });
            await API.deleteRecord();

            return res.status(200).end();
        }
        //
        // PATCH: update currently existing review
        //
        else if (method === "PATCH") {
            const request = _req as UpdateReviewRequest;

            const API = new UpdateReviewAPI({
                authenticationResponse: (await GuardedAPIEndpoint(request, "PATCH", "user")) as GuardedAPIResponse,
                elementType: "destination",
                idOfReview: request.query.review_id,
                idOfElementAssociatedWithReview: request.query.destination_id,
            });
            const updatedReviewData = await API.updateRecord({
                points: request.body.points,
                reviewContent: request.body.reviewContent,
                tags: request.body.tags,
            });

            return res.status(200).send(updatedReviewData);
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
