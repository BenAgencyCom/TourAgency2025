import type { User } from "@/@types/pages/UserProfile";
import type { ReviewType } from "@prisma/client";

export interface UserFromQuery extends Omit<User, "age" | "memberSince"> {
    age?: number;
    memberSince?: string;
    birth?: Date;
    createdAt?: Date;
}

export type AggregateFromQuery = {
    type: ReviewType;
    _count: { _all: number };
    _sum: { points: number };
}[];

export interface LatestReviewFromQuery {
    createdAt: Date;
    type: ReviewType;
    points: number;
}
