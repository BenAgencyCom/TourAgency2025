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
    PREDOMINANT: ReviewType;
    reviewsInTotal: number;
    averageScore: number;
}

export interface Landmark {
    slug: _Landmark["slug"];
    title: _Landmark["title"];
    picture: _Landmark["picture"];
    type: _Landmark["type"];
    shortDescription: _Landmark["shortDescription"];
    destination: {
        city: _Destination["city"];
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
    points: _DestinationReview["points"];
    type: _DestinationReview;
}

export interface LandmarkReview extends Review {
    landmark: Landmark;
}

export interface DestinationReview extends Review {
    destination: Destination;
}
