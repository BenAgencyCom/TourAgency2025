// Tools
import { styled, alpha } from "@mui/system";
import useCreateLandmarkContext from "@/components/create/landmark/hooks/useCreateLandmarkContext";
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

const Thumbnail: FunctionComponent = () => {
    const { thumbnailURL } = useCreateLandmarkContext();
    return (
        <ThumbnailWrapper>
            {thumbnailURL.value && (
                <SkeletonImage
                    layout="fill" //
                    alt={`thumbnail`}
                    src={thumbnailURL.value}
                    objectFit="cover"
                    modalMaxResolution="1"
                ></SkeletonImage>
            )}
        </ThumbnailWrapper>
    );
};

export default Thumbnail;
