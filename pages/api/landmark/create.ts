// Tools
import { InvalidRequestedBody, Forbidden } from "@/utils/api/Errors";
import CreateLandmarkAPI from "@/utils/api/pages/landmarks/CreateLandmarkAPI";
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
// Types
import type { NextApiResponse, NextApiRequest } from "next";
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";

export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(404).end();
    try {
        const { authenticatedUserId } = (await GuardedAPIEndpoint(req, "POST", "user")) as GuardedAPIResponse;
        const API = new CreateLandmarkAPI(req, authenticatedUserId);
        await API.main();

        return res.status(201).end();
    } catch (e: unknown) {
        if (e instanceof InvalidRequestedBody) return res.status(422).end();
        else if (e instanceof Forbidden) return res.status(401).end();
        return res.status(500).end();
    }
}
