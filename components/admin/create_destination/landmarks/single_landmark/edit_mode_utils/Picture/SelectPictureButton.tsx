// Tools
import { alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Button from "@mui/material/Button";

interface SelectPictureButtonProps {
    tabIndex: number;
    onClick: () => void;
}

const SelectPictureButton: FunctionComponent<SelectPictureButtonProps> = (props) => {
    return (
        <Button
            sx={{
                position: "absolute", //
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "150px",
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.8),
            }}
            color="neutral"
            variant="contained"
            tabIndex={props.tabIndex}
            onClick={props.onClick}
        >
            Select
        </Button>
    );
};

export default SelectPictureButton;
