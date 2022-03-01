import type { SeederDataList, LandmarkReview } from "./@types";
import faker from "faker";

const randomNumber = (): number => {
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
const randomComment = (): string => faker.lorem.sentences(3).slice(0, 100);

export default ((): SeederDataList<LandmarkReview> => {
    const result: Partial<LandmarkReview>[] = [];
    const AMOUNT_OF_LANDMARKS = 16;

    for (let i = 1; i <= AMOUNT_OF_LANDMARKS; i++)
        result.push(
            {
                reviewerId: "1",
                landmarkId: String(i),
                points: randomNumber(),
                review: randomComment(),
            },
            {
                reviewerId: "2",
                landmarkId: String(i),
                points: randomNumber(),
                review: randomComment(),
            },
            {
                reviewerId: "3",
                landmarkId: String(i),
                points: randomNumber(),
                review: randomComment(),
            },
            {
                reviewerId: "4",
                landmarkId: String(i),
                points: randomNumber(),
                review: randomComment(),
            }
        );

    return result;
})();
