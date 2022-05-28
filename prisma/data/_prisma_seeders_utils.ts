import faker from "faker";
import countries from "./_countries";
import _determineReviewType from "../../utils/api/determineReviewType";

export const determineReviewType = _determineReviewType;

// LIST OF IDENTYFICATORS
export const USERS: string[] = [];
export const DESTINATIONS: string[] = ["KRAKOW", "WARSZAWA", "VANCOUVER", "RIO_DE_JANEIRO", "HAMBURG", "TOKYO", "CAPE_TOWN"];
export const LANDMARKS: string[] = [];
export const DESTINATIONS_REVIEWS: string[] = [];
export const LANDMARKS_REVIEWS: string[] = [];
// FILL SOME LISTS
for (let i = 0; i < 100; i++) USERS.push(String(i)); // Create 100 random users
for (let i = 1; i <= 28; i++) LANDMARKS.push(String(i)); // 28 landmarks are defined in `./landmarks.ts`

export const randomReviewScore = (): number => {
    const result = faker.datatype.number({
        min: 0,
        max: 10,
        precision: 0.1,
    });
    const drawn =
        result > 5
            ? result
            : faker.datatype.number({
                  min: 0,
                  max: 10,
                  precision: 0.1,
              });
    return Number(Math.min(drawn * 1.1, 10).toFixed(1));
};

export const randomComment = (): string => faker.lorem.sentences(randomNumberFromRange(3, 10));
export const randomTags = (): string[] => faker.lorem.words(randomNumberFromRange(3, 5)).split(" ");

export const randomNumberFromRange = (min: number, max: number) => {
    return faker.datatype.number({ min, max });
};

export const getUserIds = (amount: number): string[] => {
    return [...USERS.sort(() => 0.5 - Math.random()).slice(0, amount), "MOJE_ID_JESTEM_SZEFEM"];
};

export const getRandomCountry = (): [string, string] => {
    return countries[randomNumberFromRange(0, countries.length - 1)];
};

export const capitalize = (text: string): string => text[0].toUpperCase() + text.slice(1);

// Content related staff

export const generateShortDescription = () => capitalize(faker.lorem.words(randomNumberFromRange(20, 30))).slice(0, 150);
export const generateDescriptionHeader = () => capitalize(faker.lorem.words(randomNumberFromRange(4, 20)));
export const generateDescriptionParagraph = () => capitalize(faker.lorem.words(randomNumberFromRange(130, 150))).slice(0, 1024);
export const generateDescriptionSplittedParagraph = () => capitalize(faker.lorem.words(randomNumberFromRange(65, 75))).slice(0, 512);
