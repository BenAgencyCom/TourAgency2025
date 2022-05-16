// Tools
import ALLDestinationsAPI from "@/utils/api/pages/destinations/ALLDestinationsAPI";
// Types
import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(404).end();
    try {
        return res.send(await new ALLDestinationsAPI(req).getData());
    } catch (e: unknown) {
        return res.status(500).end();
    }
}
