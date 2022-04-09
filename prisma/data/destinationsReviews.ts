// Tools
import { DESTINATIONS, getUserIds, randomReviewScore, randomTags, randomComment, randomNumberFromRange, DESTINATIONS_REVIEWS, determineReviewType } from "./_prisma_seeders_utils";
// Types
import type { SeederDataList, DestinationReview } from "./@types";

export default ((): SeederDataList<DestinationReview> => {
    const result: Partial<DestinationReview>[] = [];

    DESTINATIONS.forEach((DESTINATION_ID) => {
        getUserIds(randomNumberFromRange(30, 100)).forEach((USER_ID) => {
            const DESTINATION_REVIEW_ID = String(DESTINATIONS_REVIEWS.length);
            const points = randomReviewScore();

            DESTINATIONS_REVIEWS.push(DESTINATION_REVIEW_ID);

            result.push({
                id: DESTINATION_REVIEW_ID,
                reviewerId: USER_ID,
                destinationId: DESTINATION_ID,
                points,
                review: randomComment(),
                tags: randomTags(),
                type: determineReviewType(points),
            });
        });
    });

    return result;
})();
