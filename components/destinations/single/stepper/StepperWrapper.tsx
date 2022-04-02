// Tools
import { styled, alpha } from "@mui/system";
// Material UI Components
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";

export default styled(Stepper)({
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    left: "40px",
    zIndex: "10",
    userSelect: "none",
    ".MuiStepConnector-root": {
        marginLeft: "19px",
    },
});
