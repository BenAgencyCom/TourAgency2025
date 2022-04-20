import { prisma } from "@/prisma/db";
import type { User } from "@prisma/client";
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
        const { accessToken } = req.cookies;
        const { avatar, name, surname, gender, country, countryCode, isAdmin, id } = (
            await prisma.session.findUnique({
                where: {
                    accessToken: accessToken,
                },
                select: {
                    user: {
                        select: {
                            id: true,
                            avatar: true,
                            name: true,
                            surname: true,
                            gender: true,
                            country: true,
                            countryCode: true,
                            isAdmin: true,
                        },
                    },
                },
            })
        )?.user as User;
        return res.status(200).json({
            id,
            avatar,
            name,
            surname,
            gender,
            isAdmin,
            country: {
                name: country,
                code: countryCode,
            },
        });
    } catch (e: unknown) {
        res.status(500).end();
    }
}
