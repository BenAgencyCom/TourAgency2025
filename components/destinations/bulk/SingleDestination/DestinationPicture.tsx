// Tools
import { styled } from "@mui/system";
import { destinationPictureURL } from "@/utils/client/imageURLs";
// Types
import type { MUIStyledCommonProps } from "@mui/system";
import type { FunctionComponent } from "react";
// Styled Components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";

const Wrapper = styled("div")(({ theme }) => ({
    height: "450px",
    position: "relative",
    borderRadius: "50px 10px 50px 10px",
    overflow: "hidden",
}));

interface BackgroundPictureProps extends MUIStyledCommonProps {
    picture: string;
    city: string;
    resolution: "360p" | "480p" | "720p" | "1080p";
}

const BackgroundPicture: FunctionComponent<BackgroundPictureProps> = (props) => {
    const { picture, resolution, city, ...propsToForward } = props;
    return (
        <Wrapper {...propsToForward} className="single-destination-picture">
            <SkeletonImage
                layout="fill" //
                alt={`${city}-thumbnail`}
                src={destinationPictureURL(picture, resolution, "thumbnail")}
                objectFit="cover"
            ></SkeletonImage>
        </Wrapper>
    );
};

export default BackgroundPicture;
