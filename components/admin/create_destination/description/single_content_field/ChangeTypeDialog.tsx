// Tools
import { useState } from "react";
import stated from "@/utils/client/stated";
// Types
import type { StatedDataField } from "@/@types/StagedDataField";
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/DestinationDescription";
// Material UI Components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
// Other components
import SelectFromEnum from "@/components/_utils/SelectFromEnum";

interface ChangeTypeDialogProps {
    currentType: FieldType;
    openDialog: StatedDataField<boolean>;
    updateType: (newTitle: FieldType) => void;
}

const ChangeTypeDialog: FunctionComponent<ChangeTypeDialogProps> = (props) => {
    const [newType, setNewType] = useState<FieldType>(props.currentType);

    return (
        <Dialog open={props.openDialog.value} onClose={() => props.openDialog.setValue(false)}>
            <DialogTitle>Change type</DialogTitle>

            <DialogContent>
                <SelectFromEnum
                    enum={FieldType} //
                    value={stated<FieldType>(newType, setNewType)}
                    props={{ sx: { width: "300px", my: 1 } }}
                ></SelectFromEnum>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    disabled={props.currentType === newType} //
                    onClick={() => props.updateType(newType)}
                >
                    Confirm
                </Button>
                <Button variant="outlined" onClick={() => props.openDialog.setValue(false)}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangeTypeDialog;
