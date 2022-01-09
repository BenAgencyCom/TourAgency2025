// Libraries
import jwt from "jsonwebtoken";
import { prisma } from "@/prisma/db";
// Types
import type { User } from "@prisma/client";
import type { NextApiResponse, NextApiRequest } from "next";
// My helpers
import { Forbidden, SessionExpired } from "@/utils/api/Errors";
import CookieCreator from "@/utils/api/abstracts/CookieCreator";
//
//
//
//

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(404).end();

    class AuthenticateToken extends CookieCreator {
        private accessTokenFromCookie: string = "";
        private userIdFromToken: string = "";
        private sessionId: string = "";
        private user: User | null = null;

        public constructor() {
            super(res);
        }

        private throwForbidden(): void {
            if (this.accessTokenFromCookie) this.removeCookieHeader();
            throw new Forbidden();
        }

        private getAccessTokenFromCookie(): void {
            this.accessTokenFromCookie = req.cookies.accessToken;
            if (!this.accessTokenFromCookie) return this.throwForbidden();
        }

        private getUserIdFromToken(): void {
            this.userIdFromToken = (jwt.decode(this.accessTokenFromCookie) as { id: string }).id;
            if (!this.userIdFromToken) return this.throwForbidden();
        }

        private async checkIfThisSessionActuallyExists(): Promise<void> {
            const session = await prisma.session.findFirst({
                where: {
                    accessToken: this.accessTokenFromCookie,
                    userId: this.userIdFromToken,
                },
            });
            if (!session) return this.throwForbidden();
            // Check if session whether had expired
            if (new Date().getTime() >= new Date(session.expires).getTime()) {
                await prisma.session.delete({
                    where: {
                        id: session.id,
                    },
                });
                this.removeCookieHeader();
                throw new SessionExpired();
            }
            this.sessionId = session.id;
        }

        private async getUserFromDB(): Promise<void> {
            this.user = await prisma.user.findUnique({ where: { id: this.userIdFromToken } });
            if (!this.user) return this.throwForbidden();
        }

        public async main(): Promise<void> {
            this.getAccessTokenFromCookie();
            this.getUserIdFromToken();
            await this.checkIfThisSessionActuallyExists();
            await this.getUserFromDB();
            this.createAccessToken(this.user as User);
            this.generateCookieHeader();
            await this.updateExistingSession(this.sessionId);
        }
    }
    //
    try {
        await new AuthenticateToken().main();
        return res.status(200).json({ accepted: true });
    } catch (e: unknown) {
        if (e instanceof Forbidden) return res.status(200).json({ accepted: false });
        else if (e instanceof SessionExpired) return res.status(200).json({ accepted: false, sessionExired: true });
        else return res.status(500).end();
    }
}
