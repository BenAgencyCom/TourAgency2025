// Tools
import { prisma } from "@/prisma/db";
import PrismaRequestBody from "./PrismaRequestBody";
// Types
import type { ReviewsCallParams, BulkReviewsType, PointsDistribution } from "@/@types/pages/api/ReviewsAPI";
import type { PrismaRequestBroker, ReviewFromQuery, FeedbackFromQuery, AggregateCallParams, AggregateCallResponse } from "../@types";

export default class DestinationBroker implements PrismaRequestBroker {
    public constructor(public type: BulkReviewsType, public id: string) {}

    public async callForReviews(params: ReviewsCallParams): Promise<ReviewFromQuery[]> {
        const requestBody = new PrismaRequestBody(params).create();

        return await prisma.landmarkReview.findMany({
            where: {
                landmarkId: this.id,
            },
            ...requestBody,
        });
    }

    public async callForFeedback(idList: string[]): Promise<FeedbackFromQuery[]> {
        return (await prisma.landmarkReviewLike.groupBy({
            by: ["reviewId", "feedback"],
            where: { reviewId: { in: idList } },
            _count: { _all: true },
        })) as unknown as FeedbackFromQuery[];
    }

    public async aggregateCall(params: AggregateCallParams): Promise<AggregateCallResponse> {
        const result = await prisma.landmarkReview.aggregate({
            where: { landmarkId: this.id },
            ...(params.count ? { _count: { _all: true } } : {}),
            ...(params.avgScore ? { _avg: { points: true } } : {}),
        });

        return {
            ...(result._count ? { count: result._count._all } : {}),
            ...(result._avg?.points ? { avgScore: Number(result._avg.points.toFixed(2)) } : {}),
        };
    }

    public async pointsDistribution(): Promise<PointsDistribution> {
        const result = await prisma.landmarkReview.groupBy({
            by: ["type"],
            where: { landmarkId: this.id },
            _count: {
                _all: true,
            },
        });
        return {
            MIXED: result.find((el) => el.type === "MIXED")?._count._all ?? 0,
            NEGATIVE: result.find((el) => el.type === "NEGATIVE")?._count._all ?? 0,
            POSITIVE: result.find((el) => el.type === "POSITIVE")?._count._all ?? 0,
        };
    }
}