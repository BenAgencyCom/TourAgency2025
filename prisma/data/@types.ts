import type { User, Destination, Landmark, LandmarkReview, DestinationReview, DestinationReviewLike, LandmarkReviewLike } from "@prisma/client";

export { User, Destination, Landmark, LandmarkReview, DestinationReview, DestinationReviewLike, LandmarkReviewLike };

export type ModelName = "user" | "destination" | "landmark" | "destinationReview" | "landmarkReview" | "destinationReviewLike" | "landmarkReviewLike";

export type SeederDataItem<T> = {
    _imagesDir: string;
} & T;
export type SeederDataList<T extends User | Destination | Landmark | LandmarkReview | DestinationReview | DestinationReviewLike | LandmarkReviewLike> = Partial<SeederDataItem<T>>[];
