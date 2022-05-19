// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
import { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// Other components
import StyledButton from "./Button";
// Styled components
const StyledDialogBase = styled(Dialog)(({ theme }) => ({
    ".MuiPaper-root": {
        background: "#fff",
        minWidth: "600px",
        overflow: "hidden",
    },
}));
const BackgroundIcon = styled("span")(({ theme }) => ({
    position: "absolute",
    bottom: "-60px",
    right: "-0px",
    fontSize: "13rem",
    zIndex: 1,
    opacity: 0.1,
    svg: {
        fontSize: "inherit",
    },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontSize: "1.5rem", //
    position: "relative",
    zIndex: "2",
    userSelect: "none",
}));
const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    fontSize: "1.3rem", //
    position: "relative",
    zIndex: "2",
}));
const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    justifyContent: "flex-start", //
    paddingLeft: "24px",
    position: "relative",
    zIndex: "2",
}));

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
