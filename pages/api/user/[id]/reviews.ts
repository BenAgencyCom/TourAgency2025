import type { NextApiResponse, NextApiRequest } from "next";
//
interface IsEmailAvailableRequest extends NextApiRequest {
    query: {
        email: string;
    };
}

export default async function handler(req: IsEmailAvailableRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(404).end();
    try {
        return res.send({ essa: true });
    } catch (e: unknown) {
        res.status(500).end();
    }
}
