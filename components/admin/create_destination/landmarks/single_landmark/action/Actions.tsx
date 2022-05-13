// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { Landmark } from "@/@types/pages/admin/create_destination/Landmark";
// Material UI Components
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// Other Components
import DeleteLandmark from "@/components/admin/create_destination/landmarks/single_landmark/action/DeleteLandmark";

interface ActionsProps {
    tabIndex: number;
    previewMode: boolean;
    isValid: boolean;
    hideNavigation: StatedDataField<boolean>;
    setPreviewMode: (value: boolean) => void;
    deleteThisLandmark: () => void;
}

const Actions: FunctionComponent<ActionsProps> = (props) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <DeleteLandmark
                deleteThisLandmark={props.deleteThisLandmark}
                previewMode={props.previewMode} //
                tabIndex={props.tabIndex}
            ></DeleteLandmark>

            <Box>
                <FormControlLabel
                    control={
                        <Switch
                            onChange={(e) => props.hideNavigation.setValue(e.target.checked)} //
                            tabIndex={props.tabIndex}
                            checked={props.hideNavigation.value}
                        />
                    }
                    label="Full size"
                    sx={{
                        bgcolor: "action.hover",
                        pr: 2,
                        m: 0,
                        mr: 1,
                        borderRadius: "5px",
                    }}
                ></FormControlLabel>

                <FormControlLabel
                    control={
                        <Switch
                            onChange={(e) => props.setPreviewMode(e.target.checked)} //
                            tabIndex={props.tabIndex}
                            disabled={!props.isValid}
                        />
                    }
                    label="Preview mode"
                    sx={{
                        bgcolor: !props.isValid ? "" : "action.hover",
                        pr: 2,
                        m: 0,
                        borderRadius: "5px",
                    }}
                ></FormControlLabel>
            </Box>
        </Box>
    );
};

export default Actions;
