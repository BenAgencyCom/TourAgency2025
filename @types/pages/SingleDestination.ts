import type { Destination as _Destination, Landmark as _Landmark, DestinationReview, User } from "@prisma/client";
import type { DestinationContentField } from "@/@types/DestinationDescription";

export type LandmarkPictureResolution = "360p" | "480p" | "720p" | "1080p";

export interface Review {
    id: DestinationReview["id"];
    review: DestinationReview["review"];
    points: DestinationReview["points"];
    createdAt: string; // DestinationReview["createdAt"] formated via moment.js;
    reviewer: {
        id: User["id"];
        name: User["name"];
        surname: User["surname"];
        country: User["country"];
        countryCode: User["countryCode"];
        gender: User["gender"];
        avatar: User["avatar"];
        birth: string; // User["birth"]
    };
}

export interface Landmark {
    slug: _Landmark["slug"];
    title: _Landmark["title"];
    picture: _Landmark["picture"];
    type: _Landmark["type"];
}

export interface Destination {
    id: _Destination["id"];
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
