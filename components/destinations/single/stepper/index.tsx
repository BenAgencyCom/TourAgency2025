// Tools
import { useEffect, useState, useMemo } from "react";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import StepLabel from "@mui/material/StepLabel";
// Styled components
import StepperElement from "./StepperElement";
import StepperWrapper from "./StepperWrapper";

const ScrollStepper: FunctionComponent = () => {
    const steps = ["Landing", "Description", "Landmarks", "Reviews"];
    const [activeStep, setActiveStep] = useState<number>(0);

    const sectionsIDsToObseve = useMemo<string[]>(() => ["landing-wrapper", "description", "landmarks", "reviews"], []);

    const onStepperClick = (index: number) => {
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
                        onClick={() => onStepperClick(index)}
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
