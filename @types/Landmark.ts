export type LandmarkType = "RESTAURANT" | "MONUMENT" | "ANTIQUE BUILDING" | "RELIC" | "ART" | "NATURE";

export interface Landmark {
    title: string;
    description: string;
    picture: File | null;
    type: LandmarkType;
    tags: string[];
    pictureURL: string;
}
