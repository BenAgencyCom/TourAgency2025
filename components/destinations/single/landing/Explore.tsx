// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
// Styled components
const ExploreButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    bottom: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
    textTransform: "uppercase",
    letterSpacing: "3px",
    height: 40,
    width: 200,
    border: "1px solid #fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    transitionDelay: "500ms !important",
}));

const Explore: FunctionComponent = () => {
    return (
        <Fade in={true}>
            <ExploreButton variant="outlined" color="inherit" className="explore">
                Explore
            </ExploreButton>
        </Fade>
    );
};

export default Explore;
