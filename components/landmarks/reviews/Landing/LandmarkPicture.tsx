// Tools
import { landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Other components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";
// Styled components
import { PictureWrapper } from "@/components/_utils/styled/pages/BulkReviews";

const LandmarkPicture: FunctionComponent<{ folder: string }> = (props) => {
    return (
        <PictureWrapper>
            <SkeletonImage
                src={landmarkPictureURL(props.folder, "720p", "thumbnail")} //
                layout="fill"
                alt=""
                objectFit="cover"
                objectPosition="center"
                priority
                modalMaxResolution="1080p"
            ></SkeletonImage>
        </PictureWrapper>
    );
};

export default LandmarkPicture;
