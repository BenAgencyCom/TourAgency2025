import type { User, Destination, Landmark, LandmarkReview, DestinationReview, DestinationReviewLike, LandmarkReviewLike } from "@prisma/client";

export { User, Destination, Landmark, LandmarkReview, DestinationReview, DestinationReviewLike, LandmarkReviewLike };

export type ModelName = "user" | "destination" | "landmark" | "destinationReview" | "landmarkReview" | "destinationReviewLike" | "landmarkReviewLike";
export type SeederDataList<T extends User | Destination | Landmark | LandmarkReview | DestinationReview | DestinationReviewLike | LandmarkReviewLike> = Partial<
    {
        _imagesDir: string;
    } & T
>[];
