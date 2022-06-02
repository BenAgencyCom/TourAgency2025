// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Skeleton from "@mui/material/Skeleton";
// Styled Components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";

const ImageFieldWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    "&::before": {
        content: "''",
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "95%",
        height: "103%",
        background: alpha(theme.palette.primary.main, 0.8),
        transform: `translate(-50%,-50%)`,
        transition: "opacity 1s .3s, transform .7s .5s",
        zIndex: "-1",
    },
}));

interface ImageFieldProps {
    imageURL: string;
    split?: true;
    extend?: boolean;
    side?: "left" | "right";
}

const ImageField: FunctionComponent<ImageFieldProps> = (props) => {
    const width: number = (() => {
        if (props.split) {
            return props.extend ? 59 : 49;
        }
        return 100;
    })();

    // ClassNames (for RWD purpose)
    const type: string = props.split ? "splitted-field-image" : "entire-field-image";
    return (
        <ImageFieldWrapper
            sx={{
                width: `${width}% !important`, //
                my: "20px",
            }}
            className={[type].join(" ")}
        >
            {(() => {
                if (props.imageURL) {
                    return (
                        <>
                            <SkeletonImage
                                src={props.imageURL} //
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                                alt="image"
                                modalMaxResolution="1080p"
                            ></SkeletonImage>
                        </>
                    );
                } else {
                    return <Skeleton animation="wave" variant="rectangular" sx={{ height: "100%" }}></Skeleton>;
                }
            })()}
        </ImageFieldWrapper>
    );
};

export default ImageField;
