// Tools
import { styled } from "@mui/system";
import { landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Other components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";
// Styled components
const LandmarkPictureWrapper = styled("div")(({ theme }) => ({
    width: "700px",
    position: "relative",
    borderRadius: "0px 50px 0px 50px",
    overflow: "hidden",
}));

const LandmarkPicture: FunctionComponent<{ folder: string }> = (props) => {
    return (
        <LandmarkPictureWrapper>
            <SkeletonImage
                src={landmarkPictureURL(props.folder, "720p", "thumbnail")} //
                layout="fill"
                alt=""
                objectFit="cover"
                objectPosition="center"
                priority
                modalMaxResolution="1080p"
            ></SkeletonImage>
        </LandmarkPictureWrapper>
    );
};

export default LandmarkPicture;
