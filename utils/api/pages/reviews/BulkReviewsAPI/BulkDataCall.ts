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
import type { ReviewsCallResponse, Review } from "@/@types/pages/api/ReviewsAPI";
import type { ReviewFromQuery, PrismaRequestBroker, ExtraProperties, CallForReviewsParams } from "./@types";

export default class BulkDataCall extends BulkAPIsURLQueriesHandler<ExtraProperties> {
    public constructor(private request: NextApiRequest, private PrismaRequestBroker: PrismaRequestBroker) {
        super(
            request as any,
            ["createdAt", "points"],
            [
                {
                    name: "certianReviewType",
                    compareWith: "type",
                    default: undefined,
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
            ]
        );
    }

    public async main(): Promise<ReviewsCallResponse> {
        // ensure that landmark with given id exists
        await this.PrismaRequestBroker.ensureThatRecordIsApproved();
        const authenticatedUserId: string | null = await this.getAutheticatedUserId();
        // Points distribution && statistics
        const pointsDistribution = await new ReviewsPointsDistribution({
            PrismaRequestBroker: this.PrismaRequestBroker,
            applyPointsDistribution: this.queriesFromRequest.applyPointsDistribution !== undefined,
        }).establish();
        // Current user review
        const authenticatedUserReview = await new AuthenticatedUserReview({
            PrismaRequestBroker: this.PrismaRequestBroker,
            authenticatedUserId: authenticatedUserId,
        }).findReview();
        // Pagination properties
        const paginationProperties = await new GeneratePaginationProperties({
            PrismaRequestBroker: this.PrismaRequestBroker,
            queriesFromRequest: this.queriesFromRequest,
        }).generate();
        // Pin one review
        const pinnedReview = await new PinReview({
            PrismaRequestBroker: this.PrismaRequestBroker,
            pinnedReviewId: this.queriesFromRequest.pinnedReviewId,
            authenticatedUserId: authenticatedUserId,
        }).findReview();

        return {
            ...pinnedReview,
            ...pointsDistribution,
            ...paginationProperties,
            ...authenticatedUserReview,
            //
            reviews: await this.callForReviews({
                authenticatedUserId,
                authenticatedUserReview,
            }),
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

    private async callForReviews(params: CallForReviewsParams): Promise<Review[]> {
        const { authenticatedUserId, authenticatedUserReview } = params;

        const prismaRequestBody = this.converURLQueriesIntoPrismaBody([authenticatedUserReview?.authenticatedUserReview.id ?? ""]);
        const reviewsFromQuery: ReviewFromQuery[] = await this.PrismaRequestBroker.callForReviews(prismaRequestBody);
        return await new MergeReviewsAndFeedback({
            reviewsFromQuery,
            feedbackFromQuery: await this.PrismaRequestBroker.callForFeedback(reviewsFromQuery.map((el) => el.id)),
            authenticatedUserId: authenticatedUserId,
            PrismaRequestBroker: this.PrismaRequestBroker,
        }).combine();
    }
}
