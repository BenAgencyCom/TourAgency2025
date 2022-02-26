// Tools
import { styled, alpha } from "@mui/system";
import { landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { StatedDataField } from "@/@types/StagedDataField";
import type { LandmarkPictureResolution } from "@/@types/pages/SingleDestination";
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Image from "next/Image";
// Styled Components
import AbsolutePseudoElement from "@/components/_utils/styled/AbsolutePseudoElement";
const Wrapper = styled(AbsolutePseudoElement)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    img: {
        transform: "scale(1)",
        transition: "transform .3s",
    },
    "&:hover": {
        img: {
            transform: "scale(1.1)",
        },
        "&::after": {
            opacity: 1,
        },
    },
    "&::after": {
        background: alpha(theme.palette.text.primary, 0.4),
        backdropFilter: "blur(5px)",
        zIndex: 2,
        opacity: 0,
        transition: "opacity .5s",
    },
}));

interface BackgroundPictureProps {
    children: ReactNode;
    picture: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const BackgroundPicture: FunctionComponent<BackgroundPictureProps> = (props) => {
    return (
        <Wrapper
            pseudoElement="after" //
            fullSize
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            {props.children}
            <Image
                layout="fill" //
                alt="bg"
                src={landmarkPictureURL(props.picture, "1080p")}
                objectFit="cover"
            ></Image>
        </Wrapper>
    );
};

export default BackgroundPicture;
