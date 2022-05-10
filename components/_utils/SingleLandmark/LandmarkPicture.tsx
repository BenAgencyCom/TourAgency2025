// Tools
import { styled } from "@mui/system";
import { landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Styled Components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";

const Wrapper = styled("div")(({ theme }) => ({
    width: "100%",
    height: "290px",
    position: "relative",
    borderRadius: "3px 20px 3px 20px",
    overflow: "hidden",
}));

interface BackgroundPictureProps {
    folder: string;
    resolution: "360p" | "480p" | "720p" | "1080p";
}

const BackgroundPicture: FunctionComponent<BackgroundPictureProps> = (props) => {
    return (
        <Wrapper className="single-landmark-picture">
            <SkeletonImage
                layout="fill" //
                alt="bg"
                src={landmarkPictureURL(props.folder, props.resolution, "thumbnail")}
            ></SkeletonImage>
        </Wrapper>
    );
};

export default BackgroundPicture;
