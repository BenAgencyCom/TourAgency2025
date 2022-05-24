// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Tooltip from "@mui/material/Tooltip";
// Styled components
import Button from "@/components/create/_utils/forms/Button";

interface SingleContentFieldControlHeaderProps {
    openAddingFieldTypeDialog: () => void;
}

const SingleContentFieldControlHeader: FunctionComponent<SingleContentFieldControlHeaderProps> = (props) => {
    return (
        <Tooltip title="Change type" placement="top">
            <div>
                <Button
                    sx={{ mr: "10px" }} //
                    onClick={props.openAddingFieldTypeDialog}
                >
                    Change type
                </Button>
            </div>
        </Tooltip>
    );
};

export default SingleContentFieldControlHeader;
