// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import BackgroundImage from "./BackgroundImage";
import Information from "./Information";
import Explore from "./Explore";
// Styled components
const LandingWrapper = styled(Box)(({ theme }) => ({
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    userSelect: "none",
    color: "#fff",
}));

const Landing: FunctionComponent = () => {
    return (
        <LandingWrapper id="landing-wrapper" component="section">
            <BackgroundImage></BackgroundImage>
            <Information></Information>
            <Explore></Explore>
        </LandingWrapper>
    );
};

export default Landing;
