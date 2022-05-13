// Tools
import { useState, useMemo } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
import { helpers } from "@/redux/slices/create_destination/landmarks";

interface AddNewLandmarkDialogProps {
    openDialog: StatedDataField<boolean>;
    goToTheLatestSlide: () => void;
}

const AddNewLandmarkDialog: FunctionComponent<AddNewLandmarkDialogProps> = (props) => {
    const landmarks = useAppSelector((state) => state.landmarks.list);
    const { addItem } = helpers;

    const [landmarkTitle, setLandmarkTitle] = useState<string>("");

    const closeDialog = () => props.openDialog.setValue(false);
    const updateTitle = (e: ChangeEvent<HTMLInputElement>) => setLandmarkTitle(e.target.value);

    const titleIsValid = useMemo<boolean>(() => {
        if (props.openDialog.value === false) return false;

        if (landmarks.map((target) => target.data.title).includes(landmarkTitle)) return false;
        return landmarkTitle.length >= 3 && landmarkTitle.length <= 50;
    }, [landmarkTitle, landmarks, props.openDialog.value]);

    const addNewLandmark = () => {
        if (!titleIsValid) return;
        addItem({ title: landmarkTitle });

        setLandmarkTitle("");
        closeDialog();
        props.goToTheLatestSlide();
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
