import type { ReviewType } from "@prisma/client";
import type { DestinationReview, User } from "@prisma/client";
import type { BulkReviewsType, ReviewsCallParams, PointsDistribution } from "@/@types/pages/api/ReviewsAPI";

export interface PrismaRequestBroker {
    type: BulkReviewsType;
    id: string;

    callForReviews(params: ReviewsCallParams): Promise<ReviewFromQuery[]>;
    callForFeedback(idsList: string[]): Promise<FeedbackFromQuery[]>;
    aggregateCall(params: AggregateCallParams): Promise<AggregateCallResponse>;
    pointsDistribution(): Promise<PointsDistribution>;
    countRecordsWithSpecificTypeOnly(type: ReviewType): Promise<number>;
}

export interface ReviewFromQuery {
    id: DestinationReview["id"];
    review: DestinationReview["review"];
    points: DestinationReview["points"];
    tags: DestinationReview["tags"];
    createdAt: DestinationReview["createdAt"];
    type: DestinationReview["type"];
    reviewer: {
        id: User["id"];
        name: User["name"];
        surname: User["surname"];
        country: User["country"];
        countryCode: User["countryCode"];
        gender: User["gender"];
        avatar: User["avatar"];
        birth: User["birth"];
    };
}

export interface FeedbackFromQuery {
    reviewId: string;
    feedback: "LIKE" | "DISLIKE";
    _count: {
        _all: number;
    };
}

export interface AggregateCallParams {
    avgScore?: true;
    count?: true;
}
export interface AggregateCallResponse {
    avgScore?: number;
    count?: number;
}
