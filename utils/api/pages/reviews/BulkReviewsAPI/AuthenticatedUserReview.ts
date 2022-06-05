// Tools
import { Forbidden } from "@/utils/api/Errors";
import FindOneReview from "./abstracts/FindOneReview";
// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { ReviewFromQuery, PrismaRequestBroker } from "./@types";

class ThereIsNoAuthenticatedUserReview extends Error {}

interface AuthenticatedUserReviewParams {
    PrismaRequestBroker: PrismaRequestBroker;
    authenticatedUserId: string | null;
}

export type AuthenticatedUserReviewResult = { authenticatedUserReview: Review } | null;

export default class AuthenticatedUserReview extends FindOneReview {
    /**
     * Check whether the user is authenticated via the access token received from cookies,
     * subsequently look for associated with the user review and if one exists then get all
     * related with it feedback
     */
    public constructor(params: AuthenticatedUserReviewParams) {
        super({
            PrismaRequestBroker: params.PrismaRequestBroker,
            authenticatedUserId: params.authenticatedUserId,
        });
    }

    public async findReview(): Promise<AuthenticatedUserReviewResult> {
        if (this.authenticatedUserId === null) return null;
        try {
            const unprocessedReview = await this.getAuthenticatedUserReview();

            return {
                authenticatedUserReview: {
                    ...this.formatReview(unprocessedReview),
                    feedback: await this.getReviewFeedback(unprocessedReview.id),
                },
            };
        } catch (e: unknown) {
            if (e instanceof Forbidden || e instanceof ThereIsNoAuthenticatedUserReview) return null;
            else throw new Error();
        }
    }

    /**
     * Try to find a review associated with currently authenticated user. If review does not exist then
     * throw `ThereIsNoAuthenticatedUserReview` error, which would be
     * immediately processed and eventually `null` would be returned from the public method
     */
    private async getAuthenticatedUserReview(): Promise<ReviewFromQuery> {
        const review = await this.PrismaRequestBroker.getAuthenticatedUserReview(this.authenticatedUserId as string);
        if (review === null) throw new ThereIsNoAuthenticatedUserReview();
        return review;
    }
}
