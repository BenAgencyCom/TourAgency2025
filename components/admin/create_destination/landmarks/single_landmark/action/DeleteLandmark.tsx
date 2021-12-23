// Tools
import { useState } from "react";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface DeleteLandmarkProps {
    tabIndex: number;
    previewMode: boolean;
    deleteThisLandmark: () => void;
}

const DeleteLandmark: FunctionComponent<DeleteLandmarkProps> = (props) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const closeDialog = () => setOpenDialog(false);
    const _openDialog = () => {
        setOpenDialog(true);
    };
    const handleDeletion = () => {
        closeDialog();
        props.deleteThisLandmark();
    };
    return (
        <>
            <Fade in={!props.previewMode}>
                <Button
                    variant="contained" //
                    onClick={_openDialog}
                    tabIndex={props.tabIndex}
                >
                    Delete this landmark
                </Button>
            </Fade>

            <Dialog open={openDialog} onClose={closeDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>All the work done so far will be vanished irrevocably</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleDeletion}>
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={closeDialog}>
                        Return
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteLandmark;
