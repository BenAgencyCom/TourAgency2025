import cookie from "cookie";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

import type { User } from "@prisma/client";
import type { NextApiResponse } from "next";
// .env variables
const SESSION_DURATION = Number(process.env.SESSION_DURATION);
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
const access_expiration = process.env.ACCESS_TOKEN_EXPIRATION as string;
//
const prisma = new PrismaClient();
//
//
//
export default abstract class CookieCreator {
    private readonly PROPERTIES_TO_TOKEN = ["password", "id", "createdAt"];
    private accessToken: string | null = null;

    public constructor(public res: NextApiResponse) {}

    protected createAccessToken(user: User): void {
        interface JWTUser {
            [key: string]: "password" | "id" | "createdAt";
        }

        const dataToToken = {} as JWTUser;
        this.PROPERTIES_TO_TOKEN.forEach((prop) => {
            dataToToken[prop] = (user as any)[prop];
        });

        this.accessToken = jwt.sign(dataToToken, access_secret, { expiresIn: access_expiration });
    }

    protected generateCookieHeader(): void {
        this.res.setHeader(
            "Set-Cookie",
            cookie.serialize("accessToken", this.accessToken as string, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24,
            })
        );
    }

    protected removeCookieHeader(): void {
        this.res.setHeader(
            "Set-Cookie",
            cookie.serialize("accessToken", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                expires: new Date(0),
            })
        );
    }

    protected async createSession(email: string): Promise<void> {
        await prisma.user.update({
            where: {
                email,
            },
            data: {
                sessions: {
                    create: {
                        accessToken: this.accessToken as string,
                        expires: new Date(Date.now() + SESSION_DURATION),
                    },
                },
            },
        });
    }

    protected async updateExistingSession(sessionId: string): Promise<void> {
        await prisma.session.update({
            where: {
                id: sessionId,
            },
            data: {
                accessToken: this.accessToken as string,
            },
        });
    }
}
