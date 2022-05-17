// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Other components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";
// Styled components

const ThumbnailWrapper = styled("div")(({ theme }) => ({
    height: "calc(50% - 10px)",
    width: "100%",
    position: "relative",
    borderRadius: "5px",
    overflow: "hidden",
    background: alpha(theme.palette.text.primary, 0.05),
}));

interface ThumbnailProps {
    thumbnailURL: string | null;
}

const Thumbnail: FunctionComponent<ThumbnailProps> = (props) => {
    return (
        <ThumbnailWrapper>
            {props.thumbnailURL && (
                <SkeletonImage
                    layout="fill" //
                    alt={`thumbnail`}
                    src={props.thumbnailURL}
                    objectFit="cover"
                    modalMaxResolution="1"
                ></SkeletonImage>
            )}
        </ThumbnailWrapper>
    );
};

export default Thumbnail;
