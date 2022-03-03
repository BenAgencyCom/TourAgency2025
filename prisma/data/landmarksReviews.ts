// Tools
import type { SeederDataList, LandmarkReview } from "./@types";
// Types
import { LANDMARKS, getUserIds, randomReviewScore, randomTags, randomComment, randomNumberFromRange, LANDMARKS_REVIEWS } from "./_prisma_seeders_utils";

export default ((): SeederDataList<LandmarkReview> => {
    const result: Partial<LandmarkReview>[] = [];

    LANDMARKS.forEach((LANDMARKS_ID) => {
        getUserIds(randomNumberFromRange(30, 80)).forEach((USER_ID) => {
            const LANDMARK_REVIEW_ID = String(LANDMARKS_REVIEWS.length);
            LANDMARKS_REVIEWS.push(LANDMARK_REVIEW_ID);

            result.push({
                id: LANDMARK_REVIEW_ID,
                reviewerId: USER_ID,
                landmarkId: LANDMARKS_ID,
                points: randomReviewScore(),
                review: randomComment(),
                tags: randomTags(),
            });
        });
    });

    return result;
})();
