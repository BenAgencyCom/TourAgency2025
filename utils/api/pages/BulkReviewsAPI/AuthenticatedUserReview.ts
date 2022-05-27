// Tools
import { Forbidden } from "@/utils/api/Errors";
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
import ReviewsFormatterAbstract from "./ReviewsFormatterAbstract";
// Types
import type { NextApiRequest } from "next";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { ReviewFromQuery, PrismaRequestBroker } from "./@types";

interface AuthenticatedUserReviewParams {
    PrismaRequestBroker: PrismaRequestBroker;
    request: NextApiRequest;
}

class ThereIsNoAuthenticatedUserReview extends Error {}

export default class AuthenticatedUserReview extends ReviewsFormatterAbstract {
    private readonly PrismaRequestBroker: PrismaRequestBroker;
    private readonly request: NextApiRequest;
    /**
     * Check whether the user is authenticated via the access token received from cookies,
     * subsequently look for associated with the user review and if one exists then get all
     * related with it feedback
     */
    public constructor(params: AuthenticatedUserReviewParams) {
        super();

        this.PrismaRequestBroker = params.PrismaRequestBroker;
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
        const id = await GuardedAPIEndpoint(this.request, "GET", "user");
        if (id === null) throw new ThereIsNoAuthenticatedUserReview();
        return id;
    }
    /**
     * Try to find a review associated with currently authenticated user. If review does not exist then
     * throw `ThereIsNoAuthenticatedUserReview` error, which would be
     * immediately processed and eventually `null` would be returned from the public method
     */
    private async getAuthenticatedUserReview(reviewerId: string): Promise<ReviewFromQuery> {
        const review = await this.PrismaRequestBroker.getParticularUserReview(reviewerId);
        if (review === null) throw new ThereIsNoAuthenticatedUserReview();
        return review;
    }
    /**
     * Returns feedback matching following interface
     * ```ts
     * {
     *     likes: number;
     *     perPagedislikes: number;
     * }
     * ```
     */
    private async getReviewFeedback(reviewId: string): Promise<Review["feedback"]> {
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
