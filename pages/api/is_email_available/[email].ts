import { prisma } from "@/prisma/db";
import type { NextApiResponse, NextApiRequest } from "next";
import joi from "joi";
//
//
//
interface IsEmailAvailableRequest extends NextApiRequest {
    query: {
        email: string;
    };
}

export default async function handler(req: IsEmailAvailableRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(404).end();

    const { email } = req.query;
    const { error } = joi.string().max(255).email({ tlds: false }).validate(email);
    if (error) return res.status(402).end();

    return res.status(200).json({
        available: !Boolean(
            await prisma.user.findUnique({
                where: {
                    email: email,
                },
            })
        ),
    });
}
