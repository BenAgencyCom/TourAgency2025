// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { LandmarkPictureResolution } from "@/@types/pages/SingleDestination";
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Image from "next/Image";
// Styled Components
const PictureMask = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: `linear-gradient(180deg, ${alpha("#000", 0)} 50%, ${alpha("#000", 0.73)} 83.23%);`,
    zIndex: 1,
    transition: "opacity .3s",
}));

interface BackgroundPictureProps {
    createImagePath: (resolution: LandmarkPictureResolution) => string;
}

const BackgroundPicture: FunctionComponent<BackgroundPictureProps> = (props) => {
    return (
        <>
            <Image
                layout="fill" //
                alt="bg"
                src={props.createImagePath("1080p")}
                objectFit="cover"
            ></Image>
            <PictureMask></PictureMask>
        </>
    );
};

export default BackgroundPicture;
