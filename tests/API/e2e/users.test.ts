/**
 * @jest-environment node
 */

// Libraries
import fse from "fs-extra";
import path from "path";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import cookie from "cookie";
import jwt from "jsonwebtoken";
// Types
import type { RegisterResponse } from "@/@types/router/auth/register";
import type { User } from "@prisma/client";
// My helpers
import { uploadDir } from "@/utils/paths";
import { data, formData } from "@/tests/API/data/users";
//
interface TokenContent {
    password: string;
    id: string;
    createdAt: string;
    iat: number;
    exp: number;
}

const prisma = new PrismaClient();
let response: RegisterResponse | null = null;
let user: User | null = null;
let accessToken: string = "";
let unparsedCookie: string = "";

const API_ADDRESS = "http://localhost:3000";

describe("AUTHENTICATION", () => {
    test("User should be able to register", async () => {
        response = (await axios.post(`${API_ADDRESS}/api/auth/register`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        })) as RegisterResponse;
        user = await prisma.user.findFirst({
            where: {
                name: data.name,
                surname: data.surname,
                email: data.email,
                gender: data.gender,
                emailVerified: null,
                isAdmin: false,
                NOT: {
                    password: data.password,
                },
            },
        });
        expect(user).not.toBeNull();
    });
    test("Avatar should be stored in varying sizes", async () => {
        const sizes = ["thumbnail", "small", "medium", "large"];

        for (const size of sizes) {
            expect(await fse.pathExists(path.join(uploadDir, "avatars", user?.avatar as string, `${size}.jpg`))).toBeTruthy();
        }
    });
    test("After a successful registration cookie containg accessToken should be returned", () => {
        unparsedCookie = (response as RegisterResponse).headers["set-cookie"][0];
        const { accessToken: _accessToken } = cookie.parse(unparsedCookie);
        accessToken = _accessToken;

        expect(_accessToken).not.toBeNull();
    });
    test("AccessToken from a cookie should have a proper structure", () => {
        const verification = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as TokenContent;
        const { createdAt, password, id } = verification;

        expect(password).not.toEqual(data.password);
        expect(id).toEqual((user as User).id);
        expect(password).toEqual((user as User).password);
        expect(new Date(createdAt).getTime()).toEqual(new Date((user as User).createdAt).getTime());
    });
    test("AccessToken from a cookie should have associated session opened", async () => {
        expect(
            await prisma.session.findFirst({
                where: {
                    accessToken: accessToken,
                    userId: (user as User).id,
                },
            })
        ).not.toBeNull();
    });
    test("After successful register user should be able to logout", async () => {
        const { status } = await axios.delete(`${API_ADDRESS}/api/auth/logout`, {
            headers: {
                Cookie: unparsedCookie,
            },
        });
        expect(status).toEqual(200);
        accessToken = "";
        unparsedCookie = "";
    });
    test("After successful logout session should be removed", async () => {
        expect(
            await prisma.session.findFirst({
                where: {
                    accessToken: accessToken,
                    userId: (user as User).id,
                },
            })
        ).toBeNull();
    });
    test("Unauthenticated subject should not be able to logout", async () => {
        await axios
            .delete(`${API_ADDRESS}/api/auth/logout`)
            .then(({ status }) => {
                expect(status).toEqual(403);
            })
            .catch(({ response }) => {
                expect(response.status).toEqual(403);
            });
    });

    test("Trying to login via invalid credentials should return 400 status code", async () => {
        await axios
            .post(`${API_ADDRESS}/api/auth/login`, {
                email: data.email,
                password: "INVALID_PASSWORD",
            })
            .then(({ status }) => {
                expect(status).toEqual(401);
            })
            .catch(({ response }) => {
                expect(response.status).toEqual(401);
            });
    });

    test("User should be able to login and recive cookie containg their accessToken", async () => {
        const { status, headers } = await axios.post(`${API_ADDRESS}/api/auth/login`, {
            email: data.email,
            password: data.password,
        });
        expect(status).toEqual(200);
        unparsedCookie = (headers as RegisterResponse["headers"])["set-cookie"][0];
        const { accessToken } = cookie.parse(unparsedCookie);
        const verification = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as TokenContent;
        expect(verification).toHaveProperty("password");
        expect(verification).toHaveProperty("id");
        expect(verification).toHaveProperty("createdAt");
    });

    test("Already authenticated user should not be able to login again", async () => {
        await axios
            .post(
                `${API_ADDRESS}/api/auth/login`,
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        Cookie: unparsedCookie,
                    },
                }
            )
            .then(({ status }) => {
                expect(status).toEqual(403);
            })
            .catch(({ response }) => {
                expect(response.status).toEqual(403);
            });
    });
});
