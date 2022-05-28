// Tools
import { alpha } from "@mui/system";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Tooltip from "@mui/material/Tooltip";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
// Material UI Icons
import Settings from "@mui/icons-material/Settings";
import ZoomIn from "@mui/icons-material/ZoomIn";
// Styled components
const ImageControlsWrapper = styled("div")(({ theme }) => ({
    position: "absolute",
    bottom: "10px",
    right: "10px",
    zIndex: 1,
    backdropFilter: "blur(5px)",
    button: {
        background: theme.palette.primary.main,
        borderRadius: "3px",
        color: "#fff",
        width: "40px",
        height: "40px",
        "&:disabled": {
            background: alpha(theme.palette.text.primary, 0.5),
            color: theme.palette.text.primary,
        },
    },
}));
interface ImageControlsProps {
    openModal: () => void;

    tabIndex?: number;
    url?: string | null | File;
    openFileSelectDialog?: () => void;
}

export const ImageControls: FunctionComponent<ImageControlsProps> = (props) => {
    const tabIndex = props.tabIndex ? props.tabIndex : -1;
    return (
        <ImageControlsWrapper>
            {(() => {
                if (props.openFileSelectDialog) {
                    return (
                        <Tooltip title={props.url ? "Change" : "Select photo"} placement="top">
                            <ButtonBase tabIndex={tabIndex} onClick={props.openFileSelectDialog} sx={{ mr: "10px" }}>
                                <Settings></Settings>
                            </ButtonBase>
                        </Tooltip>
                    );
                }
            })()}

            <Tooltip title="Preview" placement="top">
                <span>
                    <ButtonBase tabIndex={tabIndex} disabled={!props.url} onClick={props.openModal}>
                        <ZoomIn></ZoomIn>
                    </ButtonBase>
                </span>
            </Tooltip>
        </ImageControlsWrapper>
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
