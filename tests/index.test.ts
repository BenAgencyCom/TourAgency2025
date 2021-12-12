import axios from "axios";
import type { AxiosResponse } from "axios";
import { PrismaClient } from "@prisma/client";
import faker from "faker/locale/de";
import FormData from "form-data";
import fse from "fs-extra";
import path from "path";

const prisma = new PrismaClient();
let response: AxiosResponse | null = null;

const password = faker.internet.password();
const data = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    gender: "MALE",
    born: String(faker.date.past()),
    email: faker.internet.email(),
    password: password,
    passwordRepeatation: password,
    country: {
        code: "DE",
        label: "Germany",
        phone: "49",
    },
};

describe("REGISTER TEST", () => {
    beforeAll(async () => {
        const body = new FormData();
        body.append("name", data.name);
        body.append("surname", data.surname);
        body.append("gender", data.gender);
        body.append("born", data.born);
        body.append("email", data.email);
        body.append("password", data.password);
        body.append("passwordRepeatation", data.passwordRepeatation);
        body.append("country", JSON.stringify(data.country));
        body.append("avatar", fse.createReadStream(path.join(__dirname, "images", "avatar.jpg")));

        response = await axios.post("http://localhost:3000/api/auth/register", body, {
            headers: {
                ...body.getHeaders(),
            },
        });
    });
    test("Should save user in db", async () => {
        expect(
            await prisma.user.findFirst({
                where: {
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                },
            })
        ).not.toBeNull();
    });
});
