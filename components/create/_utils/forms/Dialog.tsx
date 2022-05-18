// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
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
    },
}));

interface StyledDialogProps {
    open: StatedDataField<boolean>;
    title: string;
    confirm: () => void;
}

const StyledDialog: FunctionComponent<StyledDialogProps> = (props) => {
    return (
        <StyledDialogBase open={props.open.value}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions sx={{ justifyContent: "flex-start", px: "24px" }}>
                <StyledButton onClick={() => props.open.setValue(false)}>Close</StyledButton>
                <StyledButton sx={{ ml: "10px" }} primary onClick={props.confirm}>
                    Confirm
                </StyledButton>
            </DialogActions>
        </StyledDialogBase>
    );
};

export default StyledDialog;
