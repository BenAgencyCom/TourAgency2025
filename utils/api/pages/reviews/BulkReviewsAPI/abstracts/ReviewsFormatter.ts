// Tools
import { fullDate, ageOnly } from "@/utils/api/dateFormat";
// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { ReviewFromQuery } from "../@types";

/**
 * This abstract basically adds one method allowing to transform interface
 *  `ReviewFromQuery` into `Omit<Review, "feedback"`> interface
 */
export default abstract class ReviewsFormatter {
    /**
     * Transform  `ReviewFromQuery` into `Omit<Review, "feedback"`>
     */
    protected formatReview(review: ReviewFromQuery): Omit<Review, "feedback"> {
        const { reviewer } = review;

        return {
            createdAt: fullDate(review.createdAt),
            id: review.id,
            points: review.points,
            review: review.review,
            tags: review.tags as string[],
            type: review.type,
            reviewer: {
                age: ageOnly(reviewer.birth),
                avatar: reviewer.avatar,
                country: reviewer.country,
                countryCode: reviewer.countryCode,
                gender: reviewer.gender,
                id: reviewer.id,
                name: reviewer.name,
                surname: reviewer.surname,
            },
        };
    }
}
