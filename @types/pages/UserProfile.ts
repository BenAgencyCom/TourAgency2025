import type { User as _User, DestinationReview as _DestinationReview, Landmark as _Landmark, Destination as _Destination, ReviewType } from "@prisma/client";

export interface User {
    id: _User["id"];
    name: _User["name"];
    surname: _User["surname"];
    age: number;
    avatar: _User["avatar"];
    country: _User["country"];
    countryCode: _User["countryCode"];
    gender: _User["gender"];
    memberSince: string;
}

export interface PointsDistribution {
    POSITIVE: number;
    NEGATIVE: number;
    MIXED: number;
    PREDOMINANT: ReviewType | "NO_SCORE";
    reviewsInTotal: number;
    averageScore: number;
}

export interface LatestReview {
    type: ReviewType | "NO_SCORE";
    points: number;
}

export interface Landmark {
    slug: _Landmark["slug"];
    title: _Landmark["title"];
    folder: _Landmark["folder"];
    type: _Landmark["type"];
    shortDescription: _Landmark["shortDescription"];
    destination: {
        city: _Destination["city"];
        country: _Destination["country"];
    };
}

export interface Destination {
    city: _Destination["city"];
    continent: _Destination["continent"];
    folder: _Destination["folder"];
    shortDescription: _Destination["shortDescription"];
    countryCode: _Destination["countryCode"];
    country: _Destination["country"];
    slug: _Destination["slug"];
}

interface Review {
    id: _DestinationReview["id"];
    points: _DestinationReview["points"];
    type: _DestinationReview["type"];
    review: _DestinationReview["review"];
    tags: _DestinationReview["tags"];
    createdAt: _DestinationReview["createdAt"];
}

export interface LandmarkReview extends Review {
    landmark: Landmark;
}

export interface DestinationReview extends Review {
    destination: Destination;
}
