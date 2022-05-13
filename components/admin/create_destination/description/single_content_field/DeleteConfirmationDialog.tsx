// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface DeleteConfirmationDialogProps {
    openDialog: StatedDataField<boolean>;
    handleDeletion: () => void;
}

const DeleteConfirmationDialog: FunctionComponent<DeleteConfirmationDialogProps> = (props) => {
    const closeDialog = () => props.openDialog.setValue(false);

    return (
        <Dialog open={props.openDialog.value} onClose={closeDialog}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
                <DialogContentText>All the work done so far will be vanished irrevocably</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={props.handleDeletion}>
                    Delete
                </Button>
                <Button variant="outlined" onClick={closeDialog}>
                    Return
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
