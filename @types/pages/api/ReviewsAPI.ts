// Types
import type { ReviewType, Feedback as _Feedback } from "@prisma/client";
import type { DestinationReview, User } from "@prisma/client";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";

export type BulkReviewsType = "landmarks" | "destinations"; // For `BulkReviewAPI` purpose
export type OrderBy = "createdAt" | "points";
export type Sort = "asc" | "desc";
export type PointsDistribution = Record<ReviewType, number>;

export interface Statistics {
    recordsInTotal: number;
    averageScore: number;
}

export interface Feedback {
    likes: number;
    dislikes: number;
    authenticatedUserChoice?: _Feedback;
}

export interface Review {
    id: DestinationReview["id"];
    review: DestinationReview["review"];
    points: DestinationReview["points"];
    tags: string[];
    createdAt: string;
    type: ReviewType;
    reviewer: {
        id: User["id"];
        name: User["name"];
        surname: User["surname"];
        country: User["country"];
        countryCode: User["countryCode"];
        gender: User["gender"];
        avatar: User["avatar"];
        age: number; //
    };
    feedback: Feedback;
}

export interface ConstructorParams {
    reviewsType: BulkReviewsType;
    reviewingModelId: string;
}

export interface ReviewsCallParams {
    limit: number | null;
    perPage: number | null;
    page: number | null;
    certianReviewType: ReviewType | null;
    orderBy: OrderBy;
    sort: Sort;
    applyPointsDistribution?: 1;
}

export interface ReviewsCallResponse {
    reviews: Review[];
    pagination?: PaginationProperties;
    pointsDistribution?: PointsDistribution;
    statistics?: Statistics;
}

export interface ModifiedReviewResponse {
    type: DestinationReview["type"];
    points: DestinationReview["points"];
    review: DestinationReview["review"];
    tags: DestinationReview["tags"];
}
