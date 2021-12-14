// Libraries
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
// Types
import type { NextApiResponse, NextApiRequest } from "next";
// My helpers
import { CredentialsDoNotMatch, Forbidden } from "@/utils/Errors";
import CookieCreator from "@/utils/CookieCreator";
//
//
//
const prisma = new PrismaClient();
//
interface LoginRequest extends NextApiRequest {
    body: {
        password: string;
        email: string;
    };
}

export default async function handler(req: LoginRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(404).end();
    class Login extends CookieCreator {
        private user: User | null = null;
        public constructor() {
            super(res);
        }

        private async checkCredentials(): Promise<void> {
            const user = await prisma.user.findUnique({ where: { email: req.body.email } });
            if (!user || !(await bcrypt.compare(req.body.password, user.password as string))) {
                throw new CredentialsDoNotMatch();
            }
            this.user = user as User;
        }
        private async createSession(): Promise<void> {
            await prisma.user.update({
                where: {
                    email: req.body.email,
                },
                data: {
                    sessions: {
                        create: this.createUserSession(),
                    },
                },
            });
        }

        public async main() {
            await this.checkCredentials();
            this.createAccessToken(this.user as User);
            await this.createSession();
            this.generateCookieHeader();
        }
    }

    try {
        if (req.cookies.accessToken) {
            throw new Forbidden();
        }
        await new Login().main();
        res.status(200).end();
        return;
    } catch (e: unknown) {
        if (e instanceof CredentialsDoNotMatch) {
            return res.status(400).json({ msg: e.msg });
        } else if (e instanceof Forbidden) {
            return res.status(403).end();
        } else {
            return res.status(500).end();
        }
    }
}
