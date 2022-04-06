// Tools
import { prisma } from "@/prisma/db";
import PrismaRequestBody from "./PrismaRequestBody";
// Types
import type { ReviewType } from "@prisma/client";
import type { URLQueriesConvertedIntoPrismaBody } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";
import type { BulkReviewsType, PointsDistribution } from "@/@types/pages/api/ReviewsAPI";
import type { PrismaRequestBroker, ReviewFromQuery, FeedbackFromQuery, AggregateCallParams, AggregateCallResponse } from "../@types";

export default class DestinationBroker implements PrismaRequestBroker {
    public constructor(public type: BulkReviewsType, public id: string) {}

    public async callForReviews(convertedURLsQueries: URLQueriesConvertedIntoPrismaBody): Promise<ReviewFromQuery[]> {
        const { where, ...requestBody } = new PrismaRequestBody(convertedURLsQueries).create();
        return await prisma.destinationReview.findMany({
            where: {
                destinationId: this.id,
                ...where,
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

    public async pointsDistribution(): Promise<PointsDistribution> {
        const result = await prisma.destinationReview.groupBy({
            by: ["type"],
            where: { destinationId: this.id },
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

    public async countRecordsWithSpecificTypeOnly(type: ReviewType): Promise<number> {
        const result = await prisma.destinationReview.count({
            where: {
                destinationId: this.id,
                type,
            },
        });
        return result;
    }
}
const a = {
    createdAt: "2022-04-06 17:48:12",
    feedback: {
        dislikes: 23,
        likes: 34,
    },
    id: "20",
    points: 7.9,
    review: "Est aperiam consequuntur. Quia repellendus dolorem qui. Qui et iure quam sint.",
    tags: ["ad", "enim", "et"],
    type: "POSITIVE",
    reviewer: {
        age: 24,
        avatar: "lego_star_wars/LSW_ProfileIcons_CloneTrooper_Lt",
        country: "United Arab Emirates",
        countryCode: "ae",
        gender: "MALE",
        id: "90",
        name: "Samara",
        surname: "Kris",
    },
};
