// Tools
import axios from "axios";
import faker from "faker";
import bcrypt from "bcrypt";
import { prisma, API_ADDRESS } from "@/tests/API/helpers/db";
// Types
import type { Mock } from "./@types";
import type { RegisterResponse } from "@/@types/router/auth/register";

interface PrepareParams {
    id?: string;
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
    private credentials: { email: string; password: string } | null = null;
    /**
     * Access token cookie received from **\/login** route request
     */
    public accessTokenAsCookie: string | null = null;
    public id: string | null = null;

    public constructor() {}

    public async prepare(prepareParams?: PrepareParams): Promise<MockUser> {
        await this.createDatabaseRecord(prepareParams);

        if (this.credentials) {
            const { headers } = await axios.post(`${API_ADDRESS}/api/auth/login`, {
                email: this.credentials.email,
                password: this.credentials.password,
            });
            const unparsedCookie = (headers as RegisterResponse["headers"])["set-cookie"][0];
            this.accessTokenAsCookie = unparsedCookie;
        }

        return this;
    }
    public async remove(): Promise<MockUser> {
        if (this.id !== null) {
            await prisma.user.delete({ where: { id: this.id } });
            this.id = null;
        }

        return this;
    }

    private async createDatabaseRecord(prepareParams?: PrepareParams) {
        const unhashedPassword = prepareParams?.password ?? "gorzen123";
        const userId = prepareParams?.id ?? false;

        const { id, email } = await prisma.user.create({
            data: {
                ...(userId !== false && { id: userId }),
                country: "Poland",
                countryCode: "PL",
                email: prepareParams?.email ?? faker.internet.email(),
                gender: "OTHER",
                isAdmin: prepareParams?.isAdmin ?? false,
                password: await bcrypt.hash(unhashedPassword, await bcrypt.genSalt()),
                name: "John",
                surname: "Doe",
                birth: new Date("08/11/2002"),
            },
        });

        this.id = id;
        this.credentials = {
            email,
            password: unhashedPassword,
        };
    }
}
