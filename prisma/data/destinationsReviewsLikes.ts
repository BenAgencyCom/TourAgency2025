// Tools
import type { SeederDataList, DestinationReviewLike } from "./@types";
// Types
import { DESTINATIONS_REVIEWS, getUserIds, randomNumberFromRange } from "./_prisma_seeders_utils";

export default ((): SeederDataList<DestinationReviewLike> => {
    const result: Partial<DestinationReviewLike>[] = [];

    DESTINATIONS_REVIEWS.forEach((DESTINATION_REVIEW_ID) => {
        getUserIds(randomNumberFromRange(0, 100)).forEach((USER_ID) => {
            result.push({
                userId: USER_ID,
                reviewId: DESTINATION_REVIEW_ID,
                feedback: Math.random() > 0.5 ? "LIKE" : "DISLIKE",
            });
        });
    });

    return result;
})();
