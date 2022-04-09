// Tools
import { LANDMARKS, getUserIds, randomReviewScore, randomTags, randomComment, randomNumberFromRange, LANDMARKS_REVIEWS, determineReviewType } from "./_prisma_seeders_utils";
// Types
import type { SeederDataList, LandmarkReview } from "./@types";

export default ((): SeederDataList<LandmarkReview> => {
    const result: Partial<LandmarkReview>[] = [];

    LANDMARKS.forEach((LANDMARKS_ID) => {
        getUserIds(randomNumberFromRange(30, 100)).forEach((USER_ID) => {
            const LANDMARK_REVIEW_ID = String(LANDMARKS_REVIEWS.length);
            const points = randomReviewScore();

            LANDMARKS_REVIEWS.push(LANDMARK_REVIEW_ID);

            result.push({
                id: LANDMARK_REVIEW_ID,
                reviewerId: USER_ID,
                landmarkId: LANDMARKS_ID,
                points,
                review: randomComment(),
                tags: randomTags(),
                type: determineReviewType(points),
            });
        });
    });

    return result;
})();
