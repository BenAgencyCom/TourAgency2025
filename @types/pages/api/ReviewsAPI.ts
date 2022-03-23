import type { DestinationReview, User } from "@prisma/client";

export type ReviewsType = "landmarks" | "destinations";
export type OrderBy = "latest" | "score";
export type Sort = "asc" | "desc";

export interface Review {
    id: DestinationReview["id"];
    review: DestinationReview["review"];
    points: DestinationReview["points"];
    tags: string[];
    createdAt: string;
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
    feedback: {
        likes: number;
        dislikes: number;
    };
}

export interface ConstructorParams {
    reviewsType: ReviewsType;
    reviewingModelId: string;
}

export interface ReviewsCallParams {
    limit: number | null;
    perPage: number | null;
    page: number | null;
    orderBy: OrderBy;
    sort: Sort;
}

export interface PaginationProperties {
    perPage: number;
    currentPage: number;
    pagesInTotal: number;
}

export interface ReviewsCallResponse {
    reviews: Review[];
    pagination?: PaginationProperties;
    avgScore: number;
}
