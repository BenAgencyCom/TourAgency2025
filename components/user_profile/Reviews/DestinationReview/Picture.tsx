// Tools
import { styled } from "@mui/system";
import { destinationPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Other components
// Styled components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";

const PictureWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: "350px",
    borderRadius: "10px",
    overflow: "hidden",
}));

const Picture: FunctionComponent<{ folder: string }> = (props) => {
    return (
        <PictureWrapper>
            <SkeletonImage
                layout="fill" //
                alt={props.folder}
                objectFit="cover"
                objectPosition="center"
                src={destinationPictureURL(props.folder, "480p", "thumbnail")}
            ></SkeletonImage>
        </PictureWrapper>
    );
};

export default Picture;
