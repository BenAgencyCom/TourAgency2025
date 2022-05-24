// Types
import type { FunctionComponent, ReactNode } from "react";
import { StatedDataField } from "@/@types/StatedDataField";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";
import { StyledDialogBase, BackgroundIcon, StyledDialogTitle, StyledDialogContent, StyledDialogActions } from "@/components/create/_utils/styled_components/Dialog";

interface StyledDialogProps {
    open: StatedDataField<boolean>;
    title: string;
    confirm: () => void;
    disableContinueButton?: boolean;
    backgroundIcon?: ReactNode;
}

const StyledDialog: FunctionComponent<StyledDialogProps> = (props) => {
    return (
        <StyledDialogBase open={props.open.value}>
            <StyledDialogTitle>{props.title}</StyledDialogTitle>
            <StyledDialogContent>{props.children}</StyledDialogContent>
            <StyledDialogActions>
                <StyledButton onClick={() => props.open.setValue(false)}>Close</StyledButton>
                <StyledButton
                    sx={{ ml: "10px" }} //
                    primary
                    onClick={props.confirm}
                    disabled={props.disableContinueButton}
                >
                    Confirm
                </StyledButton>
            </StyledDialogActions>
            {props.backgroundIcon && <BackgroundIcon>{props.backgroundIcon}</BackgroundIcon>}
        </StyledDialogBase>
    );
};

export default StyledDialog;
