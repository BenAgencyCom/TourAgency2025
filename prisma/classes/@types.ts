import type { SeederDataList, User, Destination, Landmark, DestinationReview, LandmarkReview, DestinationReviewLike, LandmarkReviewLike } from "../data/@types";

export interface PrismaSeederData {
    userData: SeederDataList<User>; //
    destinationData: SeederDataList<Destination>;
    landmarkData: SeederDataList<Landmark>;
    destinationReviewData: SeederDataList<DestinationReview>;
    landmarksReviews: SeederDataList<LandmarkReview>;
    destinationReviewLike: SeederDataList<DestinationReviewLike>;
    landmarkReviewLike: SeederDataList<LandmarkReviewLike>;
}
