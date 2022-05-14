// Tools
import RWD from "./RWD";
import { styled } from "@mui/system";
// Types
import type { ImageURLs, Headers } from "./@types";
import type { FunctionComponent, ReactNode } from "react";
// Other Components
import BackgroundImage from "./BackgroundImage";
import Information from "./Information";
import Explore from "./Explore";
// Styled components
const LandingWrapper = styled("section")(({ theme }) => ({
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    userSelect: "none",
    color: "#fff",
    ...(RWD as any),
}));

interface ParallaxLandingProps {
    imagesURLs: ImageURLs;
    headers: Headers;
    text: string;
    icon?: ReactNode;
}

const ParallaxLanding: FunctionComponent<ParallaxLandingProps> = (props) => {
    return (
        <LandingWrapper id="landing-wrapper">
            <BackgroundImage imagesURLs={props.imagesURLs}></BackgroundImage>
            <Information headers={props.headers} text={props.text}></Information>
            <Explore></Explore>
        </LandingWrapper>
    );
};

export default ParallaxLanding;
