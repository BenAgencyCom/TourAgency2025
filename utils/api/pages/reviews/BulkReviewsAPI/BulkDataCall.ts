// Tools
import PinReview from "./PinReview";
import { Forbidden } from "@/utils/api/Errors";
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
import MergeReviewsAndFeedback from "./MergeReviewsAndFeedback";
import AuthenticatedUserReview from "./AuthenticatedUserReview";
import ReviewsPointsDistribution from "./ReviewsPointsDistribution";
import GeneratePaginationProperties from "./GeneratePaginationProperties";
import BulkAPIsURLQueriesHandler from "@/utils/api/abstracts/BulkAPIsURLQueriesHandler";
// Types
import type { NextApiRequest } from "next";
import type { ReviewType } from "@prisma/client";
import type { ReviewsCallResponse } from "@/@types/pages/api/ReviewsAPI";
import type { ExtraProperty } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";
import type { ReviewFromQuery, PrismaRequestBroker, ExtraProperties } from "./@types";

export default class BulkDataCall extends BulkAPIsURLQueriesHandler<ExtraProperties> {
    public constructor(private request: NextApiRequest, private PrismaRequestBroker: PrismaRequestBroker) {
        const extraProperties: ExtraProperty[] = [
            {
                name: "certianReviewType",
                compareWith: "type",
                default: null,
                required: false,
                values: ["MIXED", "NEGATIVE", "POSITIVE"] as ReviewType[],
            },
            {
                name: "applyPointsDistribution",
                default: false,
                values: ["1"],
            },
            {
                name: "pinnedReviewId",
                treatThisPropertyAsIDandExcludeItFromResults: true,
            },
        ];
        super(request as any, ["createdAt", "points"], extraProperties);
    }

    public async main(): Promise<ReviewsCallResponse> {
        // ensure that landmark with given id exists
        await this.PrismaRequestBroker.ensureThatRecordIsApproved();

        const authenticatedUserId: string | null = await this.getAutheticatedUserId();

        const reviewsFromQuery: ReviewFromQuery[] = await this.PrismaRequestBroker.callForReviews(this.converURLQueriesIntoPrismaBody());
        const reviews = await new MergeReviewsAndFeedback({
            reviewsFromQuery,
            feedbackFromQuery: await this.PrismaRequestBroker.callForFeedback(reviewsFromQuery.map((el) => el.id)),
            authenticatedUserId: authenticatedUserId,
            PrismaRequestBroker: this.PrismaRequestBroker,
        }).combine();

        return {
            reviews: reviews,
            // Pagination properties
            ...(await new GeneratePaginationProperties({
                PrismaRequestBroker: this.PrismaRequestBroker,
                queriesFromRequest: this.queriesFromRequest,
            }).generate()),
            // Points distribution && statistics
            ...(await new ReviewsPointsDistribution({
                PrismaRequestBroker: this.PrismaRequestBroker,
                applyPointsDistribution: this.queriesFromRequest.applyPointsDistribution !== undefined,
            }).establish()),
            // Current user review
            ...(await new AuthenticatedUserReview({
                PrismaRequestBroker: this.PrismaRequestBroker,
                authenticatedUserId: authenticatedUserId,
            }).findReview()),
            // Pin one review
            ...(await new PinReview({
                PrismaRequestBroker: this.PrismaRequestBroker,
                pinnedReviewId: this.queriesFromRequest.pinnedReviewId,
            }).findReview()),
        };
    }

    /**
     * Return id of currently authenticated user or return `false` otherwise
     */
    private async getAutheticatedUserId(): Promise<string | null> {
        try {
            const res = await GuardedAPIEndpoint(this.request, "GET", "user");
            return res === null ? null : res.authenticatedUserId;
        } catch (e: unknown) {
            if (e instanceof Forbidden) return null;
            else throw new Error();
        }
    }
}
