// Tools
import ReviewsFormatter from "./ReviewsFormatter";
// Types
import type { Feedback } from "@prisma/client";
import type { PrismaRequestBroker } from "../@types";
import type { Review } from "@/@types/pages/api/ReviewsAPI";

interface FindOneReviewConstructorParams {
    authenticatedUserId: string | null;
    PrismaRequestBroker: PrismaRequestBroker;
}

type AuthenticatedUserFeedback = { authenticatedUserChoice: Feedback } | null;

export default abstract class FindOneReview extends ReviewsFormatter {
    protected readonly PrismaRequestBroker: PrismaRequestBroker;
    protected readonly authenticatedUserId: string | null;

    public constructor(params: FindOneReviewConstructorParams) {
        super();
        this.PrismaRequestBroker = params.PrismaRequestBroker;
        this.authenticatedUserId = params.authenticatedUserId;
    }
    /**
     * Returns **one particular** review's feedback
     * ```ts
     * {
     *     likes: number;
     *     perPagedislikes: number;
     * }
     * ```
     */
    protected async getReviewFeedback(reviewId: string): Promise<Review["feedback"]> {
        const feedback = await this.PrismaRequestBroker.callForFeedback([reviewId]);

        const extractFromFeedback = (what: Feedback): number => {
            const partOfeedback = feedback.find((el) => el.feedback === what);
            return partOfeedback ? partOfeedback._count._all : 0;
        };

        return {
            dislikes: extractFromFeedback("DISLIKE"),
            likes: extractFromFeedback("LIKE"),
            ...(await this.getAuthenticatedUserFeedback(reviewId)),
        };
    }

    private async getAuthenticatedUserFeedback(reviewId: string): Promise<AuthenticatedUserFeedback> {
        if (this.authenticatedUserId === null) return null;

        const res = await this.PrismaRequestBroker.getAuthenticatedUserFeedback({
            reviewsIDsList: [reviewId],
            userId: this.authenticatedUserId,
        });

        return res && res.length ? { authenticatedUserChoice: res[0].feedback } : null;
    }
}
