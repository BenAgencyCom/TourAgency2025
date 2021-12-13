// Libraries
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import faker from "faker/locale/de";
import FormData from "form-data";
import fse from "fs-extra";
import path from "path";
// Types
import type { AxiosResponse } from "axios";
import type { Gender } from "@prisma/client";
// My helpers
import { uploadDir } from "../utils/paths";

const prisma = new PrismaClient();
let response: AxiosResponse | null = null;
let folderName: null | string = null;
const password = faker.internet.password();
const data = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    gender: "MALE" as Gender,
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
        const user = await prisma.user.findFirst({
            where: {
                name: data.name,
                surname: data.surname,
                email: data.email,
                gender: data.gender,
                emailVerified: null,
                NOT: {
                    password: data.password,
                },
            },
        });
        expect(user).not.toBeNull();
        folderName = user?.avatar as string;
    });
    test("Avatar should be stored in varying sizes", async () => {
        expect(folderName).not.toBeNull();

        const sizes = ["thumbnail", "small", "medium", "large"];
        for (const size of sizes) {
            expect(await fse.pathExists(path.join(uploadDir, "avatars", folderName as string, `${size}.jpg`))).toBeTruthy();
        }
    });
});
