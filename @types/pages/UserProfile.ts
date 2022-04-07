import type { User as _User } from "@prisma/client";

export interface User {
    id: _User["id"];
    name: _User["name"];
    surname: _User["surname"];
    age: number;
    avatar: _User["avatar"];
    country: _User["country"];
    countryCode: _User["countryCode"];
    gender: _User["gender"];
}

export interface PointsDistribution {
    POSITIVE: number;
    NEGATIVE: number;
    MIXED: number;
    reviewsInTotal: number;
}
