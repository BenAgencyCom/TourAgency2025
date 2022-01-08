import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";

import { NotFound, Forbidden } from "@/utils/api/Errors";
import type { NextApiRequest, NextApiResponse } from "next";
//
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await GuardedAPIEndpoint(req, "GET", "anonymous");
        return res.status(200).end();
    } catch (e: unknown) {
        if (e instanceof Forbidden) return res.status(403).end();
        else if (e instanceof NotFound) return res.status(404).end();
        else res.status(500).end();
    }
}
