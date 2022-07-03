// Tools
import ReviewsFormatterAbstract from "./abstracts/ReviewsFormatter";
// Types
import type { Feedback } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { ReviewFromQuery, FeedbackFromQuery, PrismaRequestBroker, AuthenticatedUserFeedbackFromQuery } from "./@types";

interface MergeReviewsAndFeedbackParams {
    authenticatedUserId: string | null;
    reviewsFromQuery: ReviewFromQuery[];
    feedbackFromQuery: FeedbackFromQuery[];
    PrismaRequestBroker: PrismaRequestBroker;
}

export default class MergeReviewsAndFeedback extends ReviewsFormatterAbstract {
    private readonly authenticatedUserId: string | null;
    private readonly reviewsFromQuery: ReviewFromQuery[];
    private readonly feedbackFromQuery: FeedbackFromQuery[];
    private readonly PrismaRequestBroker: PrismaRequestBroker;

    private authenticatedUserFeedback: AuthenticatedUserFeedbackFromQuery[] = [];
    /**
     * Combine ReviewsFromQuery with associated with them feedback and also distinguish
     * whether currently authenticated user had liked/disliked one of reviews from feedback
     */
    public constructor(params: MergeReviewsAndFeedbackParams) {
        super();

        this.reviewsFromQuery = params.reviewsFromQuery;
        this.feedbackFromQuery = params.feedbackFromQuery;
        this.authenticatedUserId = params.authenticatedUserId;
        this.PrismaRequestBroker = params.PrismaRequestBroker;
    }

    public async combine(): Promise<Review[]> {
        await this.queryForAuthenticatedUserFeedback();
        return this.reviewsFromQuery.map((review) => {
            const authenticatedUserFeedback = this.findSpecificAuthenticatedUserFeedback(review.id);

            return {
                ...this.formatReview(review),
                feedback: {
                    dislikes: this.extractFromFeedback({ reviewId: review.id, what: "DISLIKE" }),
                    likes: this.extractFromFeedback({ reviewId: review.id, what: "LIKE" }),
                    ...(authenticatedUserFeedback && { authenticatedUserChoice: authenticatedUserFeedback }),
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
    /**
     * Find all likes associated with currently authenticated user
     * and assign them to reflecting reviews
     */
    private async queryForAuthenticatedUserFeedback() {
        if (this.authenticatedUserId === null) return;
        this.authenticatedUserFeedback = await this.PrismaRequestBroker.getAuthenticatedUserFeedback({
            reviewsIDsList: this.reviewsFromQuery.map((el) => el.id),
            userId: this.authenticatedUserId,
        });
    }
    /**
     * Next step after method `queryForAuthenticatedUserFeedback`- find reflecting element
     * in `authenticatedUserFeedback` to one particular review
     */
    private findSpecificAuthenticatedUserFeedback(reviewId: string | false): Feedback | false {
        const { authenticatedUserFeedback } = this;
        const index = authenticatedUserFeedback.findIndex((el) => el.reviewId === reviewId);
        if (index !== -1) {
            const { feedback } = authenticatedUserFeedback[index];
            // Remove from array in order to make subsequent searchings swifter
            this.authenticatedUserFeedback = [...authenticatedUserFeedback.slice(0, index), ...authenticatedUserFeedback.slice(index + 1)];
            return feedback as Feedback;
        }
        return false;
    }
}
