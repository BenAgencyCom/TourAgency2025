import type { Landmark } from "@/@types/pages/landmarks/SingleLandmark";

export interface RatingsSummary {
    ratings: number;
    totalReviews: number;
}

export interface MainLandmarkFromQuery extends Omit<Landmark, "description"> {
    description: any;
}
