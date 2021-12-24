// Tools
import { useState, useMemo } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
import type { Landmark } from "@/@types/Landmark";
// Material UI Components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

interface AddNewLandmarkDialogProps {
    openDialog: StatedDataField<boolean>;
    updateLandmark: (
        index: number, //
        valueAfterModification: Landmark | "REMOVE_THIS_ELEMENT" | "ADD_ELEMENT",
        newLandmarkTitle?: string
    ) => void;
}

const AddNewLandmarkDialog: FunctionComponent<AddNewLandmarkDialogProps> = (props) => {
    const [landmarkTitle, setLandmarkTitle] = useState<string>("");

    const closeDialog = () => props.openDialog.setValue(false);
    const updateTitle = (e: ChangeEvent<HTMLInputElement>) => setLandmarkTitle(e.target.value);

    const titleIsValid = useMemo<boolean>(() => {
        return landmarkTitle.length >= 3 && landmarkTitle.length <= 50;
    }, [landmarkTitle]);

    const addNewLandmark = () => {
        if (!titleIsValid) return;
        props.updateLandmark(0, "ADD_ELEMENT", landmarkTitle);
        setLandmarkTitle("");
        closeDialog();
    };

    return (
        <Dialog open={props.openDialog.value} onClose={closeDialog}>
            <DialogTitle>Create a new landmark</DialogTitle>

            <DialogContent>
                <TextField
                    label="Landmark's title" //
                    sx={{ mt: 2, width: "400px", maxWidth: "75vw" }}
                    onChange={updateTitle}
                    value={landmarkTitle}
                    error={landmarkTitle.length > 50}
                    helperText={`${landmarkTitle.length}/50`}
                    FormHelperTextProps={{ sx: { textAlign: "right" } }}
                ></TextField>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" disabled={!titleIsValid} onClick={addNewLandmark}>
                    Continue
                </Button>
                <Button onClick={closeDialog} variant="outlined">
                    Return
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddNewLandmarkDialog;
