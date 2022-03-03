import type { SeederDataList, User } from "./@types";
import bcrypt from "bcrypt";
import faker from "faker";

import { USERS, getRandomCountry } from "./_prisma_seeders_utils";

const testingPurposedData: SeederDataList<User> = [
    {
        name: "Kacper",
        surname: "Ksiazek",
        email: "jebac_gorzen@gmail.com",
        avatar: "kacper",
        country: "Poland",
        countryCode: "pl",
        gender: "MALE",
        isAdmin: true,
        password: bcrypt.hashSync("jebac_gorzen123", bcrypt.genSaltSync()),
        _imagesDir: "avatars/kacper",
        birth: new Date("08/11/2002"),
    },
    {
        name: "Bill",
        surname: "Gates",
        email: "bill_gates@gmail.com",
        country: "United States",
        countryCode: "us",
        gender: "OTHER",
        password: bcrypt.hashSync("zaq12345", bcrypt.genSaltSync()),
        birth: new Date("08/11/2002"),
    },
];

export default ((): SeederDataList<User> => {
    const result: SeederDataList<User> = [];

    USERS.forEach((i) => {
        const [country, countryCode] = getRandomCountry();
        result.push({
            id: String(i),
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            country,
            countryCode,
            gender: "MALE",
            isAdmin: false,
            password: "sadasdasd23e1232341!",
            birth: faker.date.between("1970-01-01", "2008-01-01"),
        });
    });

    return [...result, ...testingPurposedData];
})();
