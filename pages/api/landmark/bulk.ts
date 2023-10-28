// Tools
import { ValidationError } from "@/utils/api/Errors";
import { BulkLandmarksAPI } from "@/utils/api/pages/landmarks/BulkAPI";
// Types
import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(404).end();

    try {
        const API = new BulkLandmarksAPI(req);
        return res.send(await API.getData());
    } catch (e: unknown) {
        if (e instanceof ValidationError) return res.status(422).end();
        res.status(500).end();
    }
}
