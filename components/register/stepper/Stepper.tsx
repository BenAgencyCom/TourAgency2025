import type { FunctionComponent } from "react";
// Material UI components
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import styles from "@/sass/mixins.module.sass";

interface RegisterStepperProps {
    currentSlideIndex: number;
}

const RegisterStepper: FunctionComponent<RegisterStepperProps> = (props) => {
    return (
        <Stepper
            activeStep={props.currentSlideIndex} //
            sx={{ my: 3, maxWidth: "700px", width: "100vw" }}
            className={styles.unselectable}
            alternativeLabel
        >
            <Step>
                <StepLabel>Personal information</StepLabel>
            </Step>
            <Step>
                <StepLabel>Credentials</StepLabel>
            </Step>
            <Step>
                <StepLabel>Avatar and cover photo</StepLabel>
            </Step>
            <Step>
                <StepLabel>Confirmation</StepLabel>
            </Step>
        </Stepper>
    );
};

export default RegisterStepper;
