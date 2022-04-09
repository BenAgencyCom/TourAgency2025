// Tools
import UserReviewsAPI from "@/utils/api/pages/UserReviewsAPI";
// Types
import type { NextApiResponse, NextApiRequest } from "next";

interface IsEmailAvailableRequest extends NextApiRequest {
    query: {
        email: string;
    };
}

export default async function handler(req: IsEmailAvailableRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(404).end();

    const API = new UserReviewsAPI(req);
    await API.ensureThatUserExists();
    const data = await API.getReviews();

    try {
        return res.send(data);
    } catch (e: unknown) {
        res.status(500).end();
    }
}
