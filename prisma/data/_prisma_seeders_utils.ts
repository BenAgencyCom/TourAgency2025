import faker from "faker";
import countries from "./_countries";
import _determineReviewType from "../../utils/api/determineReviewType";

export const determineReviewType = _determineReviewType;

// LIST OF IDENTYFICATORS
export const USERS: string[] = [];
export const DESTINATIONS: string[] = ["KRAKOW", "WARSZAWA", "VANCOUVER", "RIO_DE_JANEIRO"];
export const LANDMARKS: string[] = [];
export const DESTINATIONS_REVIEWS: string[] = [];
export const LANDMARKS_REVIEWS: string[] = [];
// FILL SOME LISTS
for (let i = 0; i < 100; i++) USERS.push(String(i)); // Create 100 random users
for (let i = 1; i <= 16; i++) LANDMARKS.push(String(i)); // 16 landmarks are defined in `./landmarks.ts`

export const randomReviewScore = (): number => {
    const result = faker.datatype.number({
        min: 0,
        max: 10,
        precision: 0.1,
    });
    return result > 5
        ? result
        : faker.datatype.number({
              min: 0,
              max: 10,
              precision: 0.1,
          });
};

export const randomComment = (): string => faker.lorem.sentences(3).slice(0, 150);
export const randomTags = (): string[] => faker.lorem.words(3).split(" ");

export const randomNumberFromRange = (min: number, max: number) => {
    return faker.datatype.number({ min, max });
};

export const getUserIds = (amount: number): string[] => {
    return USERS.sort(() => 0.5 - Math.random()).slice(0, amount);
};

export const getRandomCountry = (): [string, string] => {
    return countries[randomNumberFromRange(0, countries.length - 1)];
};