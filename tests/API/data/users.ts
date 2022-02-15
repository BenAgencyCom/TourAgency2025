// Tools
import faker from "faker/locale/de";
import fse from "fs-extra";
import path from "path";
import FormData from "form-data";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import bcrypt from "bcrypt";
// Types
import type { Gender, User } from "@prisma/client";
import type { RegisterResponse } from "@/@types/router/auth/register";

const prisma = new PrismaClient();
const API_ADDRESS = "http://localhost:3000";

const password = faker.internet.password();
export const data = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    gender: "MALE" as Gender,
    birth: String(new Date("08/11/2002")),
    email: faker.internet.email(),
    password: password,
    passwordRepeatation: password,
    country: {
        code: "DE",
        label: "Germany",
        phone: "49",
    },
};

export const formData: FormData = (() => {
    const body = new FormData();
    body.append("name", data.name);
    body.append("surname", data.surname);
    body.append("gender", data.gender);
    body.append("birth", data.birth);
    body.append("email", data.email);
    body.append("password", data.password);
    body.append("passwordRepeatation", data.passwordRepeatation);
    body.append("country", JSON.stringify(data.country));
    body.append("avatar", fse.createReadStream(path.join(__dirname, "images", "avatar.jpg")));

    return body;
})();

export const CreateUser = async (isAdmin: boolean): Promise<User> => {
    return await prisma.user.create({
        data: {
            country: data.country.label,
            countryCode: data.country.code,
            email: faker.internet.email(),
            gender: "OTHER",
            isAdmin,
            password: await bcrypt.hash("SUPERB_PASSWORD123", await bcrypt.genSalt()),
            emailVerified: faker.date.recent(),
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            birth: new Date("08/11/2002"),
        },
    });
};

/**
 * Log in currently existing User to recive an accessToken, which can be subsequently used as a cookie in order to get access to restricted api endpoints
 * @async
 * @param {email} string
 * @param {password} string
 * @return {Promise<string>} `accessToken` in form of unparsed cookie
 */
export const LogInUser = async (email: string, password: string): Promise<string> => {
    const { headers } = await axios.post(`${API_ADDRESS}/api/auth/login`, {
        email,
        password,
    });
    const unparsedCookie = (headers as RegisterResponse["headers"])["set-cookie"][0];
    return unparsedCookie;
};

export interface UserHelper {
    userData: User | null;
    accessToken: string | null;
}

export const prepareUser = async (isAdmin: boolean = false): Promise<UserHelper> => {
    const result: UserHelper = { userData: null, accessToken: null };

    const data: User = await CreateUser(isAdmin);
    result.userData = data;
    result.accessToken = await LogInUser(data.email, "SUPERB_PASSWORD123");

    return result;
};
