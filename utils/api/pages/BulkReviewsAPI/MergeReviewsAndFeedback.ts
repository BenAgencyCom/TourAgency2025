// Tools
import ReviewsFormatterAbstract from "./ReviewsFormatterAbstract";
// Types
import type { Feedback } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { ReviewFromQuery, FeedbackFromQuery } from "./@types";

interface MergeReviewsAndFeedbackParams {
    reviewsFromQuery: ReviewFromQuery[];
    feedbackFromQuery: FeedbackFromQuery[];
}

export default class MergeReviewsAndFeedback extends ReviewsFormatterAbstract {
    private readonly reviewsFromQuery: ReviewFromQuery[];
    private readonly feedbackFromQuery: FeedbackFromQuery[];
    /**
     * Combine ReviewsFromQuery with associated with them feedback
     */
    public constructor(params: MergeReviewsAndFeedbackParams) {
        super();

        this.feedbackFromQuery = params.feedbackFromQuery;
        this.reviewsFromQuery = params.reviewsFromQuery;
    }

    public combine(): Review[] {
        return this.reviewsFromQuery.map((review) => {
            return {
                ...this.formatReview(review),
                feedback: {
                    dislikes: this.extractFromFeedback({ reviewId: review.id, what: "DISLIKE" }),
                    likes: this.extractFromFeedback({ reviewId: review.id, what: "LIKE" }),
                },
            } as Review;
        });
    }
    /**
     * Get and remove from feedback particular either the number of likes or the number of dislikes
     */
    private extractFromFeedback(params: { reviewId: string; what: Feedback }): number {
        const { feedbackFromQuery } = this;
        const { reviewId, what } = params;

        const index: number = feedbackFromQuery.findIndex((el: FeedbackFromQuery) => {
            return el.reviewId === reviewId && el.feedback === what;
        });

        if (index !== -1 && feedbackFromQuery[index]) {
            const amount = feedbackFromQuery[index]._count._all;
            feedbackFromQuery.splice(index, 1);
            return amount;
        }
        return 0;
    }
}
