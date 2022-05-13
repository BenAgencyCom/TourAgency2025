import type { Landmark as _Landmark, Destination as _Destination } from "@prisma/client";
import type { LandmarkReview, User } from "@prisma/client";
import type { ReviewType } from "@prisma/client";

export interface SimpleReview {
    id: LandmarkReview["id"];
    review: LandmarkReview["review"];
    points: LandmarkReview["points"];
    tags: string[];
    createdAt: string;
    type: ReviewType;
}

export interface Review extends SimpleReview {
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
