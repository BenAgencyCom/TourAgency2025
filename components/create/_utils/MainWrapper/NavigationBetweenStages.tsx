// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Fade from "@mui/material/Fade";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
import Button from "../forms/Button";

const StagesNavigationWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    button: {
        width: "200px",
        height: "40px",
    },
    ["@media (max-width:900px)"]: {
        flexWrap: "wrap",
        alignItems: "flex-start",
        marginTop: "0",
        ">button": {
            order: 2,
        },
        ">span": {
            order: 1,
            marginLeft: "0",
            marginBottom: "20px",
            width: "100%",
        },
    },
    ["@media (max-width:500px)"]: {
        ">button": {
            width: "100%",
            marginLeft: "0",
            marginTop: "10px",
            "&:nth-of-type(1)": {
                order: 3,
            },
        },
    },
}));

const BlockJustification = styled("span")(({ theme }) => ({
    marginLeft: "20px",
    color: theme.palette.error.main,
    fontSize: "1rem",
    userSelect: "none",
}));

interface NavigationBetweenStagesProps {
    /** **index** of active step */
    activeStep: StatedDataField<number>;
    /** Callback which is supposed to be called instead of going farther on the last step */
    alternativeContinueCallback?: () => any;
}

const NavigationBetweenStages: FunctionComponent<NavigationBetweenStagesProps> = (props) => {
    // Redux
    const { disableNavigation, reasonBehindBlockingNavigation } = useAppSelector((state) => state.createContent);
    // Component's state
    const { activeStep, alternativeContinueCallback } = props;
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
                sx={{ ml: "10px" }}
                disabled={disableNavigation}
                onClick={goForward}
                id="go-forward"
            >
                Continue
            </Button>
            {disableNavigation && (
                <Fade in={true} key={reasonBehindBlockingNavigation}>
                    <BlockJustification>
                        In order to get farther <strong>{reasonBehindBlockingNavigation}</strong>
                    </BlockJustification>
                </Fade>
            )}
        </StagesNavigationWrapper>
    );
};

export default NavigationBetweenStages;
