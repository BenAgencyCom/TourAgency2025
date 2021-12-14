import faker from "faker/locale/de";
import fse from "fs-extra";
import path from "path";
import FormData from "form-data";

import type { Gender } from "@prisma/client";

const password = faker.internet.password();
export const data = {
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

export const formData: FormData = (() => {
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

    return body;
})();
