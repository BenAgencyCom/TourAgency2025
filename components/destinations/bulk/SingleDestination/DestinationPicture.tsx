// Tools
import { styled } from "@mui/system";
import { destinationPictureURL } from "@/utils/client/imageURLs";
// Types
import type { MUIStyledCommonProps } from "@mui/system";
import type { FunctionComponent } from "react";
// Styled Components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";

const Wrapper = styled("div")(({ theme }) => ({
    // All styles related with picture size are stored in `RWD.ts` file
    position: "relative",
    borderRadius: "10px 50px 10px 50px",
    overflow: "hidden",
}));

interface BackgroundPictureProps extends MUIStyledCommonProps {
    picture: string;
    city: string;
    country: string;
    resolution: "360p" | "480p" | "720p" | "1080p";
}

const BackgroundPicture: FunctionComponent<BackgroundPictureProps> = (props) => {
    const { picture, resolution, city, country, ...propsToForward } = props;
    return (
        <Wrapper {...propsToForward} className="single-destination-picture">
            <SkeletonImage
                layout="fill" //
                alt={`${city}-thumbnail`}
                src={destinationPictureURL(picture, resolution, "thumbnail")}
                objectFit="cover"
                modalMaxResolution="1080p"
                advanceModalProperties={{
                    title: city,
                    sectionName: country,
                }}
            ></SkeletonImage>
        </Wrapper>
    );
};

export default BackgroundPicture;
