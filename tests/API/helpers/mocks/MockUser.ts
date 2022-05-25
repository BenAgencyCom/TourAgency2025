// Tools
import axios from "axios";
import bcrypt from "bcrypt";
import { prisma, API_ADDRESS } from "../db";
// Types
import type { Mock } from "./@types";
import type { RegisterResponse } from "@/@types/router/auth/register";

interface UserInfo {
    id: string;
    email?: string;
    isAdmin?: boolean;
    password?: string;
}
/**
 * The prime feature of this Mock is easy access to farther obtaining an access to routes requiring a cookie containing JWT.
 * This cookie is available and ready to be used immediately after triggering `prepare` method by `model.accessTokenAsCookie` property.
 * ---
 * **Params**- mock expects one parameter while creating an instance- an object containing following properties:
 * - `id`- the only **required** property
 * - `email`- -optional property
 * - `isAdmin`- optional property
 * - `password`- optional property
 *
 */
export default class MockUser implements Mock {
    private readonly PASSWORD: string;
    private readonly EMAIL: string;
    private readonly IS_ADMIN: boolean;
    private readonly USER_ID: string;
    /**
     * Access token cookie received from **\/login** route request
     */
    public accessTokenAsCookie: string | null = null;

    public constructor(userInfo: UserInfo) {
        this.EMAIL = userInfo.email ?? "gorzen123@gmail.com";
        this.PASSWORD = userInfo.password ?? "gorzen123";
        this.IS_ADMIN = userInfo.isAdmin ?? false;
        this.USER_ID = userInfo.id;
    }

    public async prepare() {
        await this.createDatabaseRecord();
        const { headers } = await axios.post(`${API_ADDRESS}/api/auth/login`, {
            email: this.EMAIL,
            password: this.PASSWORD,
        });
        const unparsedCookie = (headers as RegisterResponse["headers"])["set-cookie"][0];
        this.accessTokenAsCookie = unparsedCookie;
    }
    public async remove() {
        await prisma.user.delete({ where: { id: this.USER_ID } });
    }

    private async createDatabaseRecord() {
        await prisma.user.create({
            data: {
                id: this.USER_ID,
                country: "Poland",
                countryCode: "PL",
                email: this.EMAIL,
                gender: "OTHER",
                isAdmin: this.IS_ADMIN,
                password: await bcrypt.hash(this.PASSWORD, await bcrypt.genSalt()),
                name: "John",
                surname: "Doe",
                birth: new Date("08/11/2002"),
            },
        });
    }
}
