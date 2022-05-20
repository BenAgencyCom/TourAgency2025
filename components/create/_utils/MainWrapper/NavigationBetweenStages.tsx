// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Styled components
import Button from "../forms/Button";

const StagesNavigationWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    button: {
        width: "200px",
        height: "40px",
    },
}));

interface NavigationBetweenStagesProps {
    disableContinueButton: boolean;
    activeStep: StatedDataField<number>;
    alternativeContinueCallback?: () => any;
}

const NavigationBetweenStages: FunctionComponent<NavigationBetweenStagesProps> = (props) => {
    const { disableContinueButton, activeStep, alternativeContinueCallback } = props;
    const disableGoBack: boolean = activeStep.value === 0;

    const blurButtons = () => [...(document.querySelectorAll(".stages-navigation>button") as any)].forEach((el: HTMLElement) => el.blur());
    const handleSmoothScroll = () => {
        const wrapperElement = document.querySelector("#create-content-wrapper") as unknown as HTMLElement;
        const minHeight = wrapperElement.offsetHeight;
        wrapperElement.style.minHeight = `${minHeight}px`;
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setTimeout(() => (wrapperElement.style.minHeight = `100vh`), 500);
    };

    const goForward = () => {
        if (disableContinueButton) return;
        alternativeContinueCallback ? alternativeContinueCallback() : activeStep.setValue((val) => val + 1);
        blurButtons();
        handleSmoothScroll();
    };
    const goGack = () => {
        if (disableGoBack) return;
        activeStep.setValue((val) => val - 1);
        handleSmoothScroll();
        blurButtons();
    };

    return (
        <StagesNavigationWrapper className="stages-navigation">
            <Button reverse disabled={disableGoBack} onClick={goGack}>
                Go back
            </Button>
            <Button
                reverse //
                primary
                sx={{ ml: "20px" }}
                disabled={disableContinueButton}
                onClick={goForward}
                id="go-forward"
            >
                Continue
            </Button>
        </StagesNavigationWrapper>
    );
};

export default NavigationBetweenStages;
