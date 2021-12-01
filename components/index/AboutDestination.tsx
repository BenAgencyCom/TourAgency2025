import type { FunctionComponent } from "react";
import type { TravelDestination } from "@/data/destinations";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import styles from "@/sass/indexPage/indexPage.module.sass";

interface AboutDestinationParams {
    currentDestination: TravelDestination;
    sidePanelsDistance: number;
}

const AboutDestination: FunctionComponent<AboutDestinationParams> = ({ currentDestination, sidePanelsDistance }) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    useEffect(() => {
        setActiveStep(0);
    }, [currentDestination]);
    return (
        <Box className={styles.sidePanel} sx={{ left: sidePanelsDistance }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {currentDestination.informationsAbout.map((information, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>
                                <Typography variant="h6">{information.label}</Typography>
                            </StepLabel>
                            <StepContent>
                                <Typography variant="body1" sx={{ letterSpacing: 1 }}>
                                    {information.content}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Button variant="contained" sx={{ mr: 1 }} onClick={() => setActiveStep(activeStep + 1)} disabled={activeStep == currentDestination.informationsAbout.length - 1}>
                                        Continue
                                    </Button>
                                    <Button variant="outlined" onClick={() => setActiveStep(activeStep - 1)} disabled={activeStep == 0}>
                                        Back
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default AboutDestination;
