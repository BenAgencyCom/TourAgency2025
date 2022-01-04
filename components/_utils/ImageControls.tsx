import { alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
// Material UI Icons
import Settings from "@mui/icons-material/Settings";
import ZoomIn from "@mui/icons-material/ZoomIn";

interface ImageControlsProps {
    openModal: () => void;

    tabIndex?: number;
    url?: string | null | File;
    openFileSelectDialog?: () => void;
}

export const ImageControls: FunctionComponent<ImageControlsProps> = (props) => {
    const tabIndex = props.tabIndex ? props.tabIndex : 1;

    return (
        <ButtonGroup
            sx={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                zIndex: 1,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.8),
                backdropFilter: "blur(5px)",
            }}
            variant="contained"
        >
            {(() => {
                if (props.openFileSelectDialog) {
                    return (
                        <Tooltip title={props.url ? "Change" : "Select photo"} placement="top">
                            <IconButton tabIndex={tabIndex} onClick={props.openFileSelectDialog}>
                                <Settings></Settings>
                            </IconButton>
                        </Tooltip>
                    );
                }
            })()}

            <Tooltip title="Preview" placement="top">
                <span>
                    <IconButton tabIndex={tabIndex} disabled={!props.url} onClick={props.openModal}>
                        <ZoomIn></ZoomIn>
                    </IconButton>
                </span>
            </Tooltip>
        </ButtonGroup>
    );
};

interface SelectImageButtonProps {
    tabIndex?: number;
    onClick: () => void;
}

export const SelectImageButton: FunctionComponent<SelectImageButtonProps> = (props) => {
    const tabIndex = props.tabIndex ? props.tabIndex : 1;

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
            tabIndex={tabIndex}
            onClick={props.onClick}
        >
            Select
        </Button>
    );
};
