// Tools
import { prisma } from "@/prisma/db";
import PrismaRequestBody from "./PrismaRequestBody";
// Types
import type { ReviewsCallParams, ReviewsType } from "@/@types/pages/api/ReviewsAPI";
import type { PrismaRequestBroker, ReviewFromQuery, FeedbackFromQuery, AggregateCallParams, AggregateCallResponse } from "../@types";

export default class DestinationBroker implements PrismaRequestBroker {
    public constructor(public type: ReviewsType, public id: string) {}

    public async callForReviews(params: ReviewsCallParams): Promise<ReviewFromQuery[]> {
        const requestBody = new PrismaRequestBody(params).create();

        return await prisma.destinationReview.findMany({
            where: {
                destinationId: this.id,
            },
            ...requestBody,
        });
    }

    public async callForFeedback(idList: string[]): Promise<FeedbackFromQuery[]> {
        return (await prisma.destinationReviewLike.groupBy({
            by: ["reviewId", "feedback"],
            where: { reviewId: { in: idList } },
            _count: { _all: true },
        })) as unknown as FeedbackFromQuery[];
    }

    public async aggregateCall(params: AggregateCallParams): Promise<AggregateCallResponse> {
        const result = await prisma.destinationReview.aggregate({
            where: { destinationId: this.id },
            ...(params.count ? { _count: { _all: true } } : {}),
            ...(params.avgScore ? { _avg: { points: true } } : {}),
        });

        return {
            ...(result._count ? { count: result._count._all } : {}),
            ...(result._avg?.points ? { avgScore: Number(result._avg.points.toFixed(2)) } : {}),
        };
    }
}
