// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
// Styled components
const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
    svg: {
        width: "40px",
        height: "40px",
    },
    ".MuiStepLabel-label": {
        fontSize: "1.2rem",
        fontWeight: 300,
        color: theme.palette.text.primary,
        transition: "color .4s ease-in-out",
    },
    ".MuiSvgIcon-root": {
        color: alpha(theme.palette.text.primary, 0.7),
        cursor: "pointer",
        "&.Mui-active": {
            color: `${theme.palette.primary.main} !important`,
        },
    },
    ".MuiStepIcon-text": {
        fill: theme.palette.text.primary,
        transition: "fill .4s ease-in-out",
    },
    "&.clickable": {
        ".MuiSvgIcon-root": {
            color: alpha(theme.palette.text.primary, 0.3),
            "&:hover": {
                color: alpha(theme.palette.text.primary, 0.2),
            },
        },
    },
}));

interface CreateProcessStepperProps {
    steps: string[];
    active: number;
}

const CreateProcessStepper: FunctionComponent<CreateProcessStepperProps> = (props) => {
    return (
        <Stepper>
            {props.steps.map((step, index) => {
                return (
                    <Step key={index} active={index === props.active}>
                        <StyledStepLabel className={index <= props.active ? "clickable" : ""}>{step}</StyledStepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};

export default CreateProcessStepper;
