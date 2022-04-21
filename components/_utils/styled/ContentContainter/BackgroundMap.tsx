// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
// Styled components
const MapWrapper = styled("div")(({ theme }) => ({
    position: "fixed",
    top: "0%",
    left: "0%",
    width: "100vw",
    height: "100%",
    opacity: 0.2,
    zIndex: 0,
    filter: "blur(1px)",
    animationDelay: "2s",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: "url('/images/continents/blank_background.png')",
}));

const BackgroundMap: FunctionComponent = () => {
    return (
        <Fade in={true} timeout={2000}>
            {/* To avoid opacity inheritance after MUI animations is done */}
            <div>
                <MapWrapper></MapWrapper>
            </div>
        </Fade>
    );
};

export default BackgroundMap;
