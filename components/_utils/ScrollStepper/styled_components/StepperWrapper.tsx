// Tools
import { styled } from "@mui/system";
// Material UI Components
import Stepper from "@mui/material/Stepper";

export default styled(Stepper, {
    shouldForwardProp: (prop: string) => !["white"].includes(prop),
})<{ white: boolean }>(({ theme, ...props }) => ({
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    left: "40px",
    zIndex: "10",
    userSelect: "none",
    ".MuiStepConnector-root": {
        marginLeft: "19px",
    },
    ...(props.white && {
        ".MuiStepLabel-label": {
            color: "#fff !important",
        },
        ".MuiStepIcon-text": {
            fill: "#fff !important",
        },
    }),
    ["@media (max-width:1500px)"]: {
        left: "10px",
    },
    ["@media (max-width:1300px)"]: {
        ".MuiStepLabel-label": {
            fontSize: "1rem",
        },
    },
}));
