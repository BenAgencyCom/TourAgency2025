// Tools
import { useState } from "react";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// Styled components
const StepperWrapper = styled(Stepper)({
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
const StepperElement = styled(Step)(({ theme }) => ({
    svg: {
        width: "40px",
        height: "40px",
    },
    ".MuiStepLabel-label": {
        fontSize: "1.1rem",
        letterSpacing: "1px",
    },
}));

const ScrollStepper: FunctionComponent = () => {
    const steps = ["Landing", "Description", "Landmarks", "Opinions"];
    const [activeStep, setActiveStep] = useState<number>(0);

    return (
        <StepperWrapper orientation="vertical">
            {steps.map((step, index) => {
                return (
                    <StepperElement key={step} onClick={() => setActiveStep(index)} active={index === activeStep}>
                        <StepLabel>{step}</StepLabel>
                    </StepperElement>
                );
            })}
        </StepperWrapper>
    );
};

export default ScrollStepper;
