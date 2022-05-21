// Tools
import { InvalidRequestedBody } from "@/utils/api/Errors";
import CreateLandmarkAPI from "@/utils/api/pages/landmarks/CreateLandmarkAPI";
//
// Types
import type { NextApiResponse, NextApiRequest } from "next";

export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(404).end();
    try {
        // const parsedRequest = await HandleMultipartFormDataRequest<{}>(req);
        const API = new CreateLandmarkAPI(req);
        await API.main();

        return res.status(201).end();
    } catch (e: unknown) {
        if (e instanceof InvalidRequestedBody) return res.status(422).end();
        return res.status(500).end();
    }
}
