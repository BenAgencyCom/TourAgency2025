// Tools
import type { SeederDataList, LandmarkReviewLike } from "./@types";
// Types
import { LANDMARKS_REVIEWS, getUserIds, randomNumberFromRange } from "./_prisma_seeders_utils";

export default ((): SeederDataList<LandmarkReviewLike> => {
    const result: Partial<LandmarkReviewLike>[] = [];

    LANDMARKS_REVIEWS.forEach((LANDMARK_REVIEW_ID) => {
        getUserIds(randomNumberFromRange(0, 100)).forEach((USER_ID) => {
            result.push({
                userId: USER_ID,
                reviewId: LANDMARK_REVIEW_ID,
                feedback: Math.random() > 0.5 ? "LIKE" : "DISLIKE",
            });
        });
    });

    return result;
})();
