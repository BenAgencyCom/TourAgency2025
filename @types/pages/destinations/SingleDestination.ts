import type { Destination as _Destination, Landmark as _Landmark } from "@prisma/client";
import type { DescriptionContentField } from "@/@types/Description";
import type { Review } from "@/@types/pages/api/ReviewsAPI";

export type ScoreColor = "success" | "error" | "warning";
export type LandmarkPictureResolution = "360p" | "480p" | "720p" | "1080p";
export type DestinationPictureResolution = "360p" | "480p" | "720p" | "1080p";

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
    slug: _Destination["slug"];
    city: _Destination["city"];
    country: _Destination["country"];
    population: _Destination["population"];
    continent: _Destination["continent"];
    shortDescription: _Destination["shortDescription"];
    description: DescriptionContentField[];
    folder: _Destination["folder"];
    landmarks: Landmark[];
    reviews: Review[];
}
