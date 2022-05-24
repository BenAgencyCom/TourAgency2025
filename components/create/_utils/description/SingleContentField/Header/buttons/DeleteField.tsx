// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Tooltip from "@mui/material/Tooltip";
// Material UI Icons
import Delete from "@mui/icons-material/Delete";
// Styled components
import Button from "@/components/create/_utils/forms/Button";

interface SingleContentFieldControlHeaderProps {
    blockDeleting: boolean;
    prepareDeletion: () => void;
}

const SingleContentFieldControlHeader: FunctionComponent<SingleContentFieldControlHeaderProps> = (props) => {
    return (
        <Tooltip
            title="Delete this field" //
            placement="top"
            PopperProps={props.blockDeleting && ({ sx: { display: "none" } } as any)}
        >
            <div>
                <Button
                    onClick={props.prepareDeletion} //
                    disabled={props.blockDeleting}
                    iconButton
                >
                    <Delete></Delete>
                </Button>
            </div>
        </Tooltip>
    );
};

export default SingleContentFieldControlHeader;
