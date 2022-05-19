// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Other components
import StyledDialog from "@/components/create/_utils/forms/Dialog";

interface DeleteConfirmationDialogProps {
    openDialog: StatedDataField<boolean>;
    handleDeletion: () => void;
}

const DeleteConfirmationDialog: FunctionComponent<DeleteConfirmationDialogProps> = (props) => {
    return (
        <StyledDialog
            open={props.openDialog} //
            title={"Are you sure?"}
            confirm={props.handleDeletion}
        >
            This particular field will be deleted <strong>irrevocably</strong>
        </StyledDialog>
    );
};

export default DeleteConfirmationDialog;
