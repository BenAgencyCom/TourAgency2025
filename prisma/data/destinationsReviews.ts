// Tools
import type { SeederDataList, DestinationReview } from "./@types";
// Types
import { DESTINATIONS, getUserIds, randomReviewScore, randomTags, randomComment, randomNumberFromRange, DESTINATIONS_REVIEWS } from "./_prisma_seeders_utils";

export default ((): SeederDataList<DestinationReview> => {
    const result: Partial<DestinationReview>[] = [];

    DESTINATIONS.forEach((DESTINATION_ID) => {
        getUserIds(randomNumberFromRange(30, 80)).forEach((USER_ID) => {
            const DESTINATION_REVIEW_ID = String(DESTINATIONS_REVIEWS.length);
            DESTINATIONS_REVIEWS.push(DESTINATION_REVIEW_ID);

            result.push({
                id: DESTINATION_REVIEW_ID,
                reviewerId: USER_ID,
                destinationId: DESTINATION_ID,
                points: randomReviewScore(),
                review: randomComment(),
                tags: randomTags(),
            });
        });
    });

    return result;
})();
