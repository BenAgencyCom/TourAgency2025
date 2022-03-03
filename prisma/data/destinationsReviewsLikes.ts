// Tools
import type { SeederDataList, DestinationReviewLike } from "./@types";
// Types
import { DESTINATIONS_REVIEWS, getUserIds, randomNumberFromRange } from "./_prisma_seeders_utils";

export default ((): SeederDataList<DestinationReviewLike> => {
    const result: Partial<DestinationReviewLike>[] = [];

    DESTINATIONS_REVIEWS.forEach((DESTINATION_REVIEW_ID) => {
        getUserIds(randomNumberFromRange(30, 100)).forEach((USER_ID) => {
            result.push({
                userId: USER_ID,
                destinationId: DESTINATION_REVIEW_ID,
                like: Math.random() > 0.5,
            });
        });
    });

    return result;
})();
