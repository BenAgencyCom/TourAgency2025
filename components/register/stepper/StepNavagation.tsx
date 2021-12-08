import type { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

interface StepNavigationProps {
    currentSlideIndex: number;
    blockContinue: boolean;
    updateSlideIndex: (x: number) => void;
}
const StepNavigation: FunctionComponent<StepNavigationProps> = (props) => {
    const { currentSlideIndex, updateSlideIndex, blockContinue } = props;
    const goBack = () => {
        if (currentSlideIndex === 0) return;
        else updateSlideIndex(currentSlideIndex - 1);
    };
    const goFurther = () => {
        if (blockContinue || currentSlideIndex === 3) return;
        else updateSlideIndex(currentSlideIndex + 1);
    };

    return (
        <ButtonGroup sx={{ mt: 5 }}>
            <Button variant="contained" color="neutral" sx={{ mr: 1 }} disabled={currentSlideIndex === 0} onClick={goBack}>
                Go back
            </Button>
            <Button variant="contained" disabled={blockContinue} onClick={goFurther}>
                Continue
            </Button>
        </ButtonGroup>
    );
};

export default StepNavigation;
