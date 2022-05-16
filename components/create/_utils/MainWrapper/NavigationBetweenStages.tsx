// Tools
import { styled } from "@mui/system";
import { useRef } from "react";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import ButtonWithLineTransition from "@/components/_utils/styled/ButtonWithLineTransition";

const Button = styled(ButtonWithLineTransition, {
    shouldForwardProp: (prop: string) => !["disabled"].includes(prop),
})<{ disabled?: boolean }>(({ theme, ...props }) => ({
    fontSize: "1.2rem",
    width: "200px",
    height: "40px",
    ...(props.disabled && {
        background: theme.palette.background.lightPaper,
        borderColor: theme.palette.background.lightPaper,
        color: `${theme.palette.text.primary} !important`,
        cursor: "default",
        "&:after": {
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            background: theme.palette.background.lightPaper,
            content: "''",
        },
    }),
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
    const goForward = () => {
        if (!disableContinueButton) {
            alternativeContinueCallback ? alternativeContinueCallback() : activeStep.setValue((val) => val + 1);
        }
        blurButtons();
    };
    const goGack = () => {
        if (!disableGoBack) activeStep.setValue((val) => val - 1);
        blurButtons();
    };

    return (
        <FlexBox className="stages-navigation">
            <Button reverse disabled={disableGoBack} onClick={goGack}>
                Go back
            </Button>
            <Button reverse primary sx={{ ml: "20px" }} disabled={disableContinueButton} onClick={goForward}>
                Continue
            </Button>
        </FlexBox>
    );
};

export default NavigationBetweenStages;
