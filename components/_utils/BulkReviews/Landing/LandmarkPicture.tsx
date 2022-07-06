// Tools
import { landmarkPictureURL, destinationPictureURL } from "@/utils/client/imageURLs";
import useBulkReviewsContext from "@/components/_utils/BulkReviews/hooks/useBulkReviewsContext";
// Types
import type { FunctionComponent } from "react";
// Other components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";
// Styled components
import Picture from "@/components/_utils/BulkReviews/styled_components/Picture";

const LandmarkPicture: FunctionComponent = () => {
    const context = useBulkReviewsContext();

    const src: string = (() => {
        const { folder } = context.landingScreen;
        if (context.reviewsType === "landmark") return landmarkPictureURL(folder, "720p", "thumbnail");
        return destinationPictureURL(folder, "720p", "thumbnail");
    })();

    return (
        <Picture>
            <SkeletonImage
                src={src} //
                layout="fill"
                alt=""
                objectFit="cover"
                objectPosition="center"
                priority
                modalMaxResolution="1080p"
            ></SkeletonImage>
        </Picture>
    );
};

export default LandmarkPicture;
