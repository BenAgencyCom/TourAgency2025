// Tools
import { styled } from "@mui/system";
import { useState } from "react";
// Types
import type { ImageProps } from "next/Image";
import type { FunctionComponent } from "react";
// Other components
import Image from "next/Image";
import Skeleton from "@mui/material/Skeleton";
// Styled Components
const ImageWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: "100%",
}));

const SkeletonImage: FunctionComponent<ImageProps> = (props) => {
    const [imageIsStillLoading, setImageIsStillLoading] = useState<boolean>(true);

    return (
        <ImageWrapper>
            {imageIsStillLoading && <Skeleton variant="rectangular" sx={{ width: "100%", height: "100%" }}></Skeleton>}
            <Image
                alt={props.alt} //
                {...props}
                onLoadingComplete={() => setImageIsStillLoading(false)}
            ></Image>
        </ImageWrapper>
    );
};

export default SkeletonImage;
