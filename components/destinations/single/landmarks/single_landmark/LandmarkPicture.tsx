// Tools
import { styled, alpha } from "@mui/system";
import { landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Other Components
import Image from "next/Image";
// Styled Components
import AbsolutePseudoElement from "@/components/_utils/styled/AbsolutePseudoElement";
const Wrapper = styled(AbsolutePseudoElement)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    "&:hover": {
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
