import type { Destination as _Destination, Landmark as _Landmark } from "@prisma/client";
import type { DestinationContentField } from "@/@types/DestinationDescription";
import type { Review } from "@/@types/pages/api/ReviewsAPI";

export type ScoreColor = "success" | "error" | "warning";
export type LandmarkPictureResolution = "360p" | "480p" | "720p" | "1080p";
export type DestinationPictureResolution = "360p" | "480p" | "720p" | "1080p";

export interface Landmark {
    slug: _Landmark["slug"];
    title: _Landmark["title"];
    picture: _Landmark["picture"];
    type: _Landmark["type"];
    description: _Landmark["description"];
    destination: {
        city: _Destination["city"];
    };
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
