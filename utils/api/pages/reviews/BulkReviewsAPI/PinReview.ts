// Tools
import FindOneReview from "./abstracts/FindOneReview";
// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { PrismaRequestBroker } from "./@types";

interface PinReviewParams {
    PrismaRequestBroker: PrismaRequestBroker;
    pinnedReviewId?: string;
}

export default class PinReview extends FindOneReview {
    private readonly pinnedReviewId?: string;

    public constructor(params: PinReviewParams) {
        super({ PrismaRequestBroker: params.PrismaRequestBroker });

        this.pinnedReviewId = params.pinnedReviewId;
    }

    public async findReview(): Promise<{ pinnedReview: Review } | null> {
        const { pinnedReviewId } = this;
        if (!pinnedReviewId) return null;

        const unformattedReview = await this.PrismaRequestBroker.getSpecifiedReview(pinnedReviewId);
        if (!unformattedReview) return null;

        return {
            pinnedReview: {
                ...this.formatReview(unformattedReview),
                feedback: await this.getReviewFeedback(unformattedReview.id),
            },
        };
    }
}
