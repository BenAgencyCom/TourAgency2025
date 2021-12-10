import type { FunctionComponent } from "react";
import { useState, useEffect } from "react";
// Material UI components
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import styles from "@/sass/mixins.module.sass";

interface RegisterStepperProps {
    currentSlideIndex: number;
}

const RegisterStepper: FunctionComponent<RegisterStepperProps> = (props) => {
    const [display, setDisplay] = useState<boolean>(false);
    const trackWidth = () => {
        if (window.innerHeight < 700 || window.innerWidth < 500) setDisplay(false);
        else setDisplay(true);
    };
    useEffect(() => {
        trackWidth();
        window.addEventListener("resize", trackWidth);
    });
    return display ? (
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
                <StepLabel>Avatar</StepLabel>
            </Step>
            <Step>
                <StepLabel>Confirmation</StepLabel>
            </Step>
        </Stepper>
    ) : (
        <></>
    );
};

export default RegisterStepper;
