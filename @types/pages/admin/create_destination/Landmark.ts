import type { LandmarkType } from "@prisma/client";

export interface Landmark {
    title: string;
    description: string;
    picture: File | null;
    type: LandmarkType;
    tags: string[];
    pictureURL: string;
}
