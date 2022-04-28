// Tools
import { ValidationError } from "@/utils/api/Errors";
import BulkDestinationsAPI from "@/utils/api/pages/destinations/BulkDestinationsAPI";
// Types
import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(404).end();

    try {
        const API = new BulkDestinationsAPI(req);
        const data = await API.getData();

        return res.send(data);
    } catch (e: unknown) {
        if (e instanceof ValidationError) return res.status(422).end();
        res.status(500).end();
    }
}
