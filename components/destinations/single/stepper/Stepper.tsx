// Tools
import { useEffect, useState, useMemo } from "react";
import { styled, alpha } from "@mui/system";
// Types
import type { Theme } from "@mui/system";
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
        fontWeight: 300,
        color: theme.palette.text.primary,
    },
    ".MuiSvgIcon-root": {
        color: alpha(theme.palette.text.primary, 0.7),
        cursor: "pointer",
        "&:hover": {
            color: alpha(theme.palette.text.primary, 0.6),
        },
        "&.Mui-active": {
            color: `${theme.palette.primary.main} !important`,
        },
    },
    ".MuiStepIcon-text": {
        fill: theme.palette.text.primary,
    },
}));

const ScrollStepper: FunctionComponent = () => {
    const steps = ["Landing", "Description", "Landmarks", "Reviews"];
    const [activeStep, setActiveStep] = useState<number>(0);

    const sectionsIDsToObseve = useMemo<string[]>(() => ["landing-wrapper", "description", "landmarks", "reviews"], []);

    const onClick = (index: number) => {
        setActiveStep(index);

        if (index) {
            const top = (document.getElementById(sectionsIDsToObseve[index]) as HTMLDivElement).getBoundingClientRect().top + window.scrollY;
            scrollTo({ left: 0, top, behavior: "smooth" });
        } else scrollTo({ left: 0, top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const reversedIDs: string[] = JSON.parse(JSON.stringify(sectionsIDsToObseve)).reverse();
        const intersectingSections: Record<string, boolean> = {};

        const getCurrentStepName = (): string => {
            for (let item of reversedIDs) {
                if (intersectingSections[item]) return item;
            }
            return "";
        };

        const options: IntersectionObserverInit = { threshold: 0.05 };
        const Observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                intersectingSections[entry.target.getAttribute("id") as string] = entry.isIntersecting;
                setActiveStep(sectionsIDsToObseve.indexOf(getCurrentStepName()));
            });
        }, options);

        sectionsIDsToObseve.forEach((id) => {
            intersectingSections[id] = false;
            Observer.observe(document.getElementById(id) as HTMLDivElement);
        });
    }, [sectionsIDsToObseve]);

    return (
        <StepperWrapper orientation="vertical">
            {steps.map((step, index) => {
                return (
                    <StepperElement
                        key={step} //
                        onClick={() => onClick(index)}
                        active={index === activeStep}
                    >
                        <StepLabel>{step}</StepLabel>
                    </StepperElement>
                );
            })}
        </StepperWrapper>
    );
};

export default ScrollStepper;
