// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { prismaCertainProps } from "@/utils/prismaCertainProps";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(
        await prisma.post.findMany({
            where: {
                author: {
                    name: "Kacper",
                },
            },
            select: {
                ...prismaCertainProps(["title", "published", "content"], true),
                author: prismaCertainProps(["name", "email", "occupation"]),
                categories: prismaCertainProps(["name"]),
            },
        })
    );
}