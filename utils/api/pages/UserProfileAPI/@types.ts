import type { User } from "@/@types/pages/UserProfile";
import type { ReviewType } from "@prisma/client";

export interface UserFromQuery extends Omit<User, "age"> {
    age?: number;
    birth?: Date;
}

export type PointsDistributionFromQuery = {
    type: ReviewType;
    _count: { _all: number };
}[];
