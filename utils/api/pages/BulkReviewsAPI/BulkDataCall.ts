// Tools
import { Forbidden } from "@/utils/api/Errors";
import { fullDate, ageOnly } from "@/utils/api/dateFormat";
import getAutheticatedUserID from "@/utils/api/GuardedAPIEndpoint";
import establishPaginationProperties from "@/utils/api/establishPaginationProperties";
import BulkAPIsURLQueriesHandler from "@/utils/api/abstracts/BulkAPIsURLQueriesHandler";
// Types
import type { NextApiRequest } from "next";
import type { ReviewType } from "@prisma/client";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { Review, ReviewsCallResponse } from "@/@types/pages/api/ReviewsAPI";
import type { ExtraProperty } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";
import type { ReviewFromQuery, FeedbackFromQuery, PrismaRequestBroker } from "./@types";

interface ExtraProperties {
    certianReviewType: ReviewType | null;
    applyPointsDistribution: "1" | false;
}

export default class BulkDataCall extends BulkAPIsURLQueriesHandler<ExtraProperties> {
    private authenticatedUserReview: Review | null = null;

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

        const feedbacks: FeedbackFromQuery[] = await this.PrismaRequestBroker.callForFeedback(reviewsFromQuery.map((el) => el.id));

        const reviews = this._mergeReviewsAndFeedback(reviewsFromQuery, feedbacks);
        const pagination = await this._generatePaginationProperties();

        let extras: Omit<ReviewsCallResponse, "reviews" | "pagination"> = {};

        await this.findAuthenticatedUserReview();

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
            ...(this.authenticatedUserReview && { authenticatedUserReview: this.authenticatedUserReview }),
        };
    }

    private async findAuthenticatedUserReview() {
        try {
            const id = await getAutheticatedUserID(this.request, "GET", "user");
            if (id === null) return;
            //
            const review = await this.PrismaRequestBroker.getAuthenticatedUserReview(id);
            if (review === null) return;
            //
            const feedback = await this.PrismaRequestBroker.callForFeedback([review.id]);

            const extractFromFeedback = (what: "LIKE" | "DISLIKE"): number => {
                const partOfeedback = feedback.find((el) => el.feedback === what);
                return partOfeedback ? partOfeedback._count._all : 0;
            };

            this.authenticatedUserReview = {
                ...this._formatReviewFromQuery(review),
                feedback: {
                    dislikes: extractFromFeedback("DISLIKE"),
                    likes: extractFromFeedback("LIKE"),
                },
            };
        } catch (e: unknown) {
            if (e instanceof Forbidden) return null;
            else throw new Error();
        }
    }

    private _mergeReviewsAndFeedback(reviews: ReviewFromQuery[], feedbacks: FeedbackFromQuery[]): Review[] {
        const _extractFromFeedback = (reviewId: string, feedback: "LIKE" | "DISLIKE"): number => {
            const index: number = feedbacks.findIndex((el: FeedbackFromQuery) => el.reviewId === reviewId && el.feedback === feedback);
            if (index !== -1 && feedbacks[index]) {
                const amount = feedbacks[index]._count._all;
                feedbacks.splice(index, 1);
                return amount;
            }
            return 0;
        };

        return reviews.map((review): Review => {
            return {
                ...this._formatReviewFromQuery(review),
                feedback: {
                    dislikes: _extractFromFeedback(review.id, "DISLIKE"),
                    likes: _extractFromFeedback(review.id, "LIKE"),
                },
            };
        });
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

    /**
     * Transform interface `ReviewFromQuery` into `Omit<Review, "feedback"`>
     */
    private _formatReviewFromQuery(review: ReviewFromQuery): Omit<Review, "feedback"> {
        const { reviewer } = review;

        return {
            createdAt: fullDate(review.createdAt),
            id: review.id,
            points: review.points,
            review: review.review,
            tags: review.tags as string[],
            type: review.type,
            reviewer: {
                age: ageOnly(reviewer.birth),
                avatar: reviewer.avatar,
                country: reviewer.country,
                countryCode: reviewer.countryCode,
                gender: reviewer.gender,
                id: reviewer.id,
                name: reviewer.name,
                surname: reviewer.surname,
            },
        };
    }
}
