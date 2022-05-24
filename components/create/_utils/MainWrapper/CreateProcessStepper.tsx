// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import Tooltip from "@mui/material/Tooltip";
import StepLabel from "@mui/material/StepLabel";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
    svg: {
        width: "40px",
        height: "40px",
    },
    ".MuiStepLabel-label": {
        fontSize: "1.2rem",
        fontWeight: "300 !important",
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
    activeStep: StatedDataField<number>;
    alreadyVisitedSteps: Set<number>;
}

const CreateProcessStepper: FunctionComponent<CreateProcessStepperProps> = (props) => {
    const { disableNavigation } = useAppSelector((state) => state.createContent);
    const { steps, activeStep, alreadyVisitedSteps } = props;

    return (
        <Stepper>
            {steps.map((step, index) => {
                const isClickable: boolean = !disableNavigation && alreadyVisitedSteps.has(index);
                const isActive = index === activeStep.value;
                if (isActive || isClickable) {
                    const tooltipMsg = isActive ? "Currently editing step" : "Correctly filled step";
                    return (
                        <Tooltip title={tooltipMsg}>
                            <Step key={index} active={isActive} onClick={() => isClickable && activeStep.setValue(index)}>
                                <StyledStepLabel className={isClickable ? "clickable" : ""}>{step}</StyledStepLabel>
                            </Step>
                        </Tooltip>
                    );
                }
                return (
                    <Step key={index} active={false}>
                        <StyledStepLabel>{step}</StyledStepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};

export default CreateProcessStepper;
