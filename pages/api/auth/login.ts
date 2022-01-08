// Libraries
import { prisma } from "@/prisma/db";

import bcrypt from "bcrypt";
// Types
import type { User } from "@prisma/client";
import type { NextApiResponse, NextApiRequest } from "next";
// My helpers
import { CredentialsDoNotMatch, Forbidden } from "@/utils/api/Errors";
import CookieCreator from "@/utils/api/abstracts/CookieCreator";
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
//
//
//;
//
interface LoginRequest extends NextApiRequest {
    body: {
        password: string;
        email: string;
    };
}

export default async function handler(req: LoginRequest, res: NextApiResponse) {
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

        public async main() {
            await this.checkCredentials();
            this.createAccessToken(this.user as User);
            await this.createSession(req.body.email);
            this.generateCookieHeader();
        }
    }

    try {
        await GuardedAPIEndpoint(req, "POST", "anonymous");
        if (req.cookies.accessToken) {
            throw new Forbidden();
        }
        await new Login().main();
        res.status(200).end();
        return;
    } catch (e: unknown) {
        if (e instanceof CredentialsDoNotMatch) {
            return res.status(401).json({ msg: e.msg });
        } else if (e instanceof Forbidden) {
            return res.status(403).end();
        } else {
            return res.status(500).end();
        }
    }
}
