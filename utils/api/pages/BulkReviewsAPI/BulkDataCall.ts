// Tools
import MergeReviewsAndFeedback from "./MergeReviewsAndFeedback";
import AuthenticatedUserReview from "./AuthenticatedUserReview";
import establishPaginationProperties from "@/utils/api/establishPaginationProperties";
import BulkAPIsURLQueriesHandler from "@/utils/api/abstracts/BulkAPIsURLQueriesHandler";
// Types
import type { NextApiRequest } from "next";
import type { ReviewType } from "@prisma/client";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { ReviewsCallResponse } from "@/@types/pages/api/ReviewsAPI";
import type { ExtraProperty } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";
import type { ReviewFromQuery, PrismaRequestBroker } from "./@types";

interface ExtraProperties {
    certianReviewType: ReviewType | null;
    applyPointsDistribution: "1" | false;
}

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
        ];
        super(request as any, ["createdAt", "points"], extraProperties);
    }

    public async main(): Promise<ReviewsCallResponse> {
        const reviewsFromQuery: ReviewFromQuery[] = await this.PrismaRequestBroker.callForReviews(this.converURLQueriesIntoPrismaBody());
        const reviews = new MergeReviewsAndFeedback({
            reviewsFromQuery,
            feedbackFromQuery: await this.PrismaRequestBroker.callForFeedback(reviewsFromQuery.map((el) => el.id)),
        }).combine();

        const pagination = await this._generatePaginationProperties();

        let extras: Omit<ReviewsCallResponse, "reviews" | "pagination"> = {};

        if (this.quriesFromRequest.applyPointsDistribution) {
            const pointsDistribution = await this.PrismaRequestBroker.pointsDistribution();
            const statistics = await this.PrismaRequestBroker.aggregateCall({ count: true, avgScore: true });

            extras = {
                pointsDistribution: pointsDistribution,
                statistics: {
                    averageScore: statistics.avgScore as number,
                    recordsInTotal: statistics.count as number,
                },
            };
        }

        return {
            reviews: reviews,
            ...(pagination && { pagination }),
            ...extras,
            //
            ...(await new AuthenticatedUserReview({
                PrismaRequestBroker: this.PrismaRequestBroker,
                request: this.request,
            }).findReview()),
        };
    }

    private async _generatePaginationProperties(): Promise<PaginationProperties | false> {
        const { certianReviewType, page, perPage } = this.quriesFromRequest;
        if (!page || !perPage) return false;

        let recordsInTotal: number = 0;
        if (certianReviewType) recordsInTotal = await this.PrismaRequestBroker.countRecordsWithSpecificTypeOnly(certianReviewType);
        else {
            const response = await this.PrismaRequestBroker.aggregateCall({ count: true });
            recordsInTotal = response.count as number;
        }

        return establishPaginationProperties({ page, perPage, recordsInTotal });
    }
}
