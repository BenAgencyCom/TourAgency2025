import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
import type { Landmark } from "@/@types/Landmark";
// Material UI Components
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// Other Components
import DeleteLandmark from "@/components/admin/create_destination/landmarks/single_landmark/action/DeleteLandmark";

interface ActionsProps {
    tabIndex: number;
    previewMode: boolean;
    hideNavigation: StatedDataField<boolean>;
    setPreviewMode: (value: boolean) => void;
    updateData: (data: Landmark | "REMOVE_THIS_ELEMENT") => void;
}

const Actions: FunctionComponent<ActionsProps> = (props) => {
    const deleteThisLandmark = () => props.updateData("REMOVE_THIS_ELEMENT");

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <DeleteLandmark
                previewMode={props.previewMode} //
                tabIndex={props.tabIndex}
                deleteThisLandmark={deleteThisLandmark}
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
                        />
                    }
                    label="Preview mode"
                    sx={{
                        bgcolor: "action.hover",
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
