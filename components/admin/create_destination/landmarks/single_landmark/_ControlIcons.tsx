import { alpha } from "@mui/system";
// Types
import type { Landmark } from "@/@types/Landmark";
import type { FunctionComponent } from "react";
// Material UI Components
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
// Material UI Icons
import Settings from "@mui/icons-material/Settings";
import ZoomIn from "@mui/icons-material/ZoomIn";

interface ControlIconsProps {
    tabIndex: number;
    picture: Landmark["picture"];
    updateData?: (prop: keyof Landmark, value: Landmark[typeof prop]) => void;
    openModal: () => void;
    openFileSelectDialog?: () => void;
}

const ControlIcons: FunctionComponent<ControlIconsProps> = (props) => {
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
                if (props.openFileSelectDialog && props.updateData) {
                    return (
                        <Tooltip title={props.picture ? "Change" : "Select photo"} placement="top">
                            <IconButton tabIndex={props.tabIndex} onClick={props.openFileSelectDialog}>
                                <Settings></Settings>
                            </IconButton>
                        </Tooltip>
                    );
                }
            })()}

            <Tooltip title="Preview" placement="top">
                <span>
                    <IconButton tabIndex={props.tabIndex} disabled={!props.picture} onClick={props.openModal}>
                        <ZoomIn></ZoomIn>
                    </IconButton>
                </span>
            </Tooltip>
        </ButtonGroup>
    );
};

export default ControlIcons;
