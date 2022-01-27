import type { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

interface StepNavigationProps {
    currentSlideIndex: number;
    blockContinue: boolean;
    updateSlideIndex: (x: number) => void;
    // Optional
    continueMsg?: string;
    disableNavigationButtons?: boolean;
    continueAction?: () => void;
}
const StepNavigation: FunctionComponent<StepNavigationProps> = (props) => {
    const { currentSlideIndex, updateSlideIndex, blockContinue, continueMsg } = props;
    const goBack = () => {
        if (currentSlideIndex === 0) return;
        else updateSlideIndex(currentSlideIndex - 1);
    };
    const goFurther = () => {
        if (blockContinue || currentSlideIndex === 4) return;
        else updateSlideIndex(currentSlideIndex + 1);
    };

    return (
        <ButtonGroup sx={{ mt: 5, alignSelf: "center" }}>
            <Button
                variant="contained" //
                color="neutral"
                sx={{ mr: 1 }}
                disabled={currentSlideIndex === 0 || props.disableNavigationButtons}
                onClick={goBack}
            >
                Go back
            </Button>
            <Button
                variant="contained" //
                disabled={blockContinue || props.disableNavigationButtons}
                onClick={props.continueAction ? props.continueAction : goFurther}
            >
                {continueMsg ? continueMsg : "Continue"}
            </Button>
        </ButtonGroup>
    );
};

export default StepNavigation;
