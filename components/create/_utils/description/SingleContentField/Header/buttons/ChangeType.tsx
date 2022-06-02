// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Tooltip from "@mui/material/Tooltip";
// Material UI Icons
import Settings from "@mui/icons-material/Settings";
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
                    sx={{ mr: "10px", width: "60px" }} //
                    onClick={props.openAddingFieldTypeDialog}
                >
                    <Settings />
                </Button>
            </div>
        </Tooltip>
    );
};

export default SingleContentFieldControlHeader;
