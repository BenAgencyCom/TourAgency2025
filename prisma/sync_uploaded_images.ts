// Tools
import { UploadedPicturesHandler } from "./classes/UploadedPicturesHandler";
// Data
import userData from "./data/users";
import destinationData from "./data/destinations";
import landmarkData from "./data/landmarks";
import destinationReviewData from "./data/destinationsReviews";
import landmarksReviews from "./data/landmarksReviews";
import destinationReviewLike from "./data/destinationsReviewsLikes";
import landmarkReviewLike from "./data/landmarksReviewsLikes";

const main = async () => {
    console.clear();

    const Seeder = new UploadedPicturesHandler({
        userData,
        destinationData,
        landmarkData,
        destinationReviewData,
        landmarksReviews,
        destinationReviewLike,
        landmarkReviewLike,
    });

    await Seeder.main();
};

main();
