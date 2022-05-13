// Tools
import { styled } from "@mui/system";
import { destinationPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Other components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";
// Styled components

const PictureWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
}));

const Picture: FunctionComponent<{ folder: string; country: string; city: string }> = (props) => {
    return (
        <PictureWrapper className="single-destination-review-picture">
            {props.children}
            <SkeletonImage
                layout="fill" //
                alt={props.folder}
                objectFit="cover"
                objectPosition="center"
                src={destinationPictureURL(props.folder, "480p", "thumbnail")}
                advanceModalProperties={{
                    sectionName: props.country,
                    title: props.city,
                }}
                modalMaxResolution="1080p"
            ></SkeletonImage>
        </PictureWrapper>
    );
};

export default Picture;
