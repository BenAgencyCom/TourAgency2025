import type { SeederDataList, User } from "./@types";
import bcrypt from "bcrypt";

export default [
    {
        name: "Kacper",
        surname: "Ksiazek",
        email: "jebac_gorzen@gmail.com",
        avatar: "kacper",
        country: "Poland",
        countryCode: "48",
        gender: "MALE",
        isAdmin: true,
        password: bcrypt.hashSync("jebac_gorzen123", bcrypt.genSaltSync()),
        _imagesDir: "avatars/kacper",
    },
    {
        name: "Bill",
        surname: "Gates",
        email: "bill_gates@gmail.com",
        country: "US",
        countryCode: "48",
        gender: "OTHER",
        password: bcrypt.hashSync("zaq12345", bcrypt.genSaltSync()),
    },
] as SeederDataList<User>;
