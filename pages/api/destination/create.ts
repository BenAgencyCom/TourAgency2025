// Tools
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
import { Forbidden, InvalidRequestedBody } from "@/utils/api/Errors";
import CreateDestinationAPI from "@/utils/api/pages/destinations/CreateDestinationAPI";
// Types
import type { NextApiResponse } from "next";
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";
import type { CreateDestinationRequest } from "@/@types/router/destination";
//

export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req: CreateDestinationRequest, res: NextApiResponse) {
    try {
        const { authenticatedUserId } = (await GuardedAPIEndpoint(req, "POST", "user")) as GuardedAPIResponse;
        const API = new CreateDestinationAPI(req, authenticatedUserId);
        await API.main();

        return res.status(201).end();
    } catch (e: unknown) {
        if (e instanceof InvalidRequestedBody) return res.status(422).end();
        else if (e instanceof Forbidden) return res.status(401).end();
        return res.status(500).end();
    }
}
