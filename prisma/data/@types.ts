import type { User, Destination, Landmark, LandmarkReview, DestinationReview } from "@prisma/client";

export { User, Destination, Landmark, LandmarkReview, DestinationReview };

export type ModelName = "user" | "destination" | "landmark" | "destinationReview" | "landmarkReview";
export type SeederDataList<T extends User | Destination | Landmark | LandmarkReview | DestinationReview> = Partial<
    {
        _imagesDir: string;
    } & T
>[];
