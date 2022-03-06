import type { Destination as _Destination, Landmark as _Landmark, DestinationReview, User } from "@prisma/client";
import type { DestinationContentField } from "@/@types/DestinationDescription";

export type ScoreColor = "success" | "error" | "warning";
export type LandmarkPictureResolution = "360p" | "480p" | "720p" | "1080p";

export interface FeedbackFromQuery {
    reviewId: string;
    feedback: "LIKE" | "DISLIKE";
    _count: {
        _all: number;
    };
}

export interface DestinationFromQuery extends Omit<Destination, "reviews" | "description"> {
    id: string;
    description: any;
    reviews: {
        id: DestinationReview["id"];
        review: DestinationReview["review"];
        points: DestinationReview["points"];
        tags: DestinationReview["tags"];
        createdAt: DestinationReview["createdAt"];
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
    }[];
}

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

export interface Landmark {
    slug: _Landmark["slug"];
    title: _Landmark["title"];
    picture: _Landmark["picture"];
    type: _Landmark["type"];
}

export interface Destination {
    slug: _Destination["slug"];
    city: _Destination["city"];
    country: _Destination["country"];
    population: _Destination["population"];
    continent: _Destination["continent"];
    shortDescription: _Destination["shortDescription"];
    description: DestinationContentField[];
    folder: _Destination["folder"];
    landmarks: Landmark[];
    reviews: Review[];
}
