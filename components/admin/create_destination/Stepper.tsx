import type { FunctionComponent } from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const CreateDestinationStepper: FunctionComponent<{ activeStep: number }> = ({ activeStep }) => {
    return (
        <Stepper activeStep={activeStep} sx={{ maxWidth: "800px", width: "100vw" }}>
            <Step>
                <StepLabel>General information</StepLabel>
            </Step>
            <Step>
                <StepLabel>Thumbnail</StepLabel>
            </Step>
            <Step>
                <StepLabel>Landmarks</StepLabel>
            </Step>
            <Step>
                <StepLabel>Description</StepLabel>
            </Step>
            <Step>
                <StepLabel>Confirmation</StepLabel>
            </Step>
        </Stepper>
    );
};

export default CreateDestinationStepper;
