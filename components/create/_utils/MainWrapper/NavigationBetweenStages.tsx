// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Styled components
import Button from "../forms/Button";

const StagesNavigationWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    button: {
        width: "200px",
        height: "40px",
    },
}));

const BlockJustification = styled("span")(({ theme }) => ({
    marginLeft: "20px",
    color: theme.palette.error.main,
    fontSize: "1.2rem",
    userSelect: "none",
}));

interface NavigationBetweenStagesProps {
    /** **index** of active step */
    activeStep: StatedDataField<number>;
    /** Disable **entire** navigation between stages */
    disableNavigation: boolean;
    /** Callback which is supposed to be called instead of going farther on the last step */
    alternativeContinueCallback?: () => any;
    /**
     * Short message whill is going to be displayed on right side of **continue** button,
     * informing user of the reason behind blocking access to change step ensure
     */
    disabledNavigationJustification: string;
}

const NavigationBetweenStages: FunctionComponent<NavigationBetweenStagesProps> = (props) => {
    const { disableNavigation, activeStep, alternativeContinueCallback, disabledNavigationJustification } = props;
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
        if (disableNavigation) return;
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
            <Button reverse disabled={disableGoBack || disableNavigation} onClick={goGack}>
                Go back
            </Button>
            <Button
                reverse //
                primary
                sx={{ ml: "20px" }}
                disabled={disableNavigation}
                onClick={goForward}
                id="go-forward"
            >
                Continue
            </Button>
            {disableNavigation && (
                <BlockJustification>
                    In order to get farther <strong>{disabledNavigationJustification}</strong>
                </BlockJustification>
            )}
        </StagesNavigationWrapper>
    );
};

export default NavigationBetweenStages;
