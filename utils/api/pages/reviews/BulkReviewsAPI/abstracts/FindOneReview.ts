// Tools
import ReviewsFormatter from "./ReviewsFormatter";
// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { PrismaRequestBroker } from "../@types";

export default abstract class FindOneReview extends ReviewsFormatter {
    protected PrismaRequestBroker: PrismaRequestBroker;

    public constructor(params: { PrismaRequestBroker: PrismaRequestBroker }) {
        super();
        this.PrismaRequestBroker = params.PrismaRequestBroker;
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

        const extractFromFeedback = (what: "LIKE" | "DISLIKE"): number => {
            const partOfeedback = feedback.find((el) => el.feedback === what);
            return partOfeedback ? partOfeedback._count._all : 0;
        };

        return {
            dislikes: extractFromFeedback("DISLIKE"),
            likes: extractFromFeedback("LIKE"),
        };
    }
}
