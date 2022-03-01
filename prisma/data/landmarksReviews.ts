import type { SeederDataList, LandmarkReview } from "./@types";
import faker from "faker";

const randomNumber = (): number =>
    faker.datatype.number({
        min: 0,
        max: 10,
        precision: 10,
    });

export default ((): SeederDataList<LandmarkReview> => {
    const result: Partial<LandmarkReview>[] = [];
    const AMOUNT_OF_LANDMARKS = 16;

    for (let i = 1; i <= AMOUNT_OF_LANDMARKS; i++)
        result.push(
            {
                reviewerId: "1",
                landmarkId: String(i),
                points: randomNumber(),
                review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus odio mollis libero dolor.",
            },
            {
                reviewerId: "2",
                landmarkId: String(i),
                points: randomNumber(),
                review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus odio mollis libero dolor.",
            },
            {
                reviewerId: "3",
                landmarkId: String(i),
                points: randomNumber(),
                review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus odio mollis libero dolor.",
            },
            {
                reviewerId: "4",
                landmarkId: String(i),
                points: randomNumber(),
                review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus odio mollis libero dolor.",
            }
        );

    return result;
})();
