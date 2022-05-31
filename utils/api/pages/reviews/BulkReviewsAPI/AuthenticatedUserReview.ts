// Tools
import { Forbidden } from "@/utils/api/Errors";
import FindOneReview from "./abstracts/FindOneReview";
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
// Types
import type { NextApiRequest } from "next";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { ReviewFromQuery, PrismaRequestBroker } from "./@types";
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";

interface AuthenticatedUserReviewParams {
    PrismaRequestBroker: PrismaRequestBroker;
    request: NextApiRequest;
}

class ThereIsNoAuthenticatedUserReview extends Error {}

export default class AuthenticatedUserReview extends FindOneReview {
    private readonly request: NextApiRequest;
    /**
     * Check whether the user is authenticated via the access token received from cookies,
     * subsequently look for associated with the user review and if one exists then get all
     * related with it feedback
     */
    public constructor(params: AuthenticatedUserReviewParams) {
        super({ PrismaRequestBroker: params.PrismaRequestBroker });

        this.request = params.request;
    }

    public async findReview(): Promise<{ authenticatedUserReview: Review } | null> {
        try {
            const reviewerId = await this.getAutheticatedUserId();
            const unprocessedReview = await this.getAuthenticatedUserReview(reviewerId);

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
     * Return id of currently authenticated user,
     * otherwise throw `ThereIsNoAuthenticatedUserReview` error, which would be
     * immediately processed and eventually `null` would be returned from the public method
     */
    private async getAutheticatedUserId(): Promise<string> {
        const { authenticatedUserId } = (await GuardedAPIEndpoint(this.request, "GET", "user")) as GuardedAPIResponse;
        if (authenticatedUserId === null) throw new ThereIsNoAuthenticatedUserReview();
        return authenticatedUserId;
    }
    /**
     * Try to find a review associated with currently authenticated user. If review does not exist then
     * throw `ThereIsNoAuthenticatedUserReview` error, which would be
     * immediately processed and eventually `null` would be returned from the public method
     */
    private async getAuthenticatedUserReview(reviewerId: string): Promise<ReviewFromQuery> {
        const review = await this.PrismaRequestBroker.getAuthenticatedUserReview(reviewerId);
        if (review === null) throw new ThereIsNoAuthenticatedUserReview();
        return review;
    }
}
