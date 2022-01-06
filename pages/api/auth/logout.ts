// Libraries
import { prisma } from "@/prisma/db";
// Types
import type { NextApiResponse, NextApiRequest } from "next";
// My helpers
import cookie from "cookie";
//
//
//
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") return res.status(404).end();
    if (!req.cookies.accessToken) {
        return res.status(403).end();
    }
    try {
        await prisma.session.delete({
            where: {
                accessToken: req.cookies.accessToken,
            },
        });
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("accessToken", "", {
                httpOnly: true,
                sameSite: "strict",
                path: "/",
                secure: false,
                expires: new Date(0),
            })
        );
        res.status(200).end();
        return;
    } catch (e: unknown) {
        return res.status(500).end();
    }
}
