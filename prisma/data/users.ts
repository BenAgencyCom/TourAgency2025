// Tools
import fse from "fs-extra";
import bcrypt from "bcrypt";
import faker from "faker";
import path from "path";
import { USERS, getRandomCountry, randomNumberFromRange } from "./_prisma_seeders_utils";
// Types
import type { SeederDataList, User } from "./@types";

const testingPurposedData: SeederDataList<User> = [
    {
        id: "MOJE_ID_JESTEM_SZEFEM",
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

// const

const legoStarWarsAvatars = fse.readdirSync(path.join(__dirname, "images", "avatars", "lego_star_wars"));
const amountOfAvatars = legoStarWarsAvatars.length;

const randomLegoStarWarsAvatar = (): string => {
    return legoStarWarsAvatars[randomNumberFromRange(0, amountOfAvatars - 1)] as string;
};

export default ((): SeederDataList<User> => {
    const result: SeederDataList<User> = [];

    USERS.forEach((i) => {
        const [country, countryCode] = getRandomCountry();
        const avatar = randomLegoStarWarsAvatar();

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
            avatar: `lego_star_wars/${avatar}`,
            _imagesDir: `/avatars/lego_star_wars/${avatar}`,
        });
    });

    return [...result, ...testingPurposedData];
})();
