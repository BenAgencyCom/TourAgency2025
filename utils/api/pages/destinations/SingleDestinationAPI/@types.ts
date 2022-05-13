import type { Destination as _Destination, Landmark as _Landmark } from "@prisma/client";
import type { Destination } from "@/@types/pages/destinations/SingleDestination";

export interface RatingsSummary {
    ratings: number;
    totalReviews: number;
}
export interface DataFromAPI extends RatingsSummary {
    destination: Destination;
}

export interface DestinationFromQuery extends Omit<Destination, "reviews" | "description"> {
    id: string;
    description: any;
}
