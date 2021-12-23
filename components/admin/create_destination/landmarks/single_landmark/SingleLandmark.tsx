import { useState } from "react";
// Types
import type { FunctionComponent } from "react";
import type { Landmark } from "@/@types/Landmark";
import type { StatedDataField } from "@/@types/StagedDataField";
// Material UI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// Other components
import PreviewMode from "./PreviewMode";
import EditMode from "./EditMode";
// Material UI Icons
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

interface SingleLandmarkProps {
    currentSlideIndex: number;
    index: number;
    data: Landmark;
    sx?: Record<string, unknown>;
    updateData: (data: Landmark) => void;
    hideNavigation: StatedDataField<boolean>;
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const [previewMode, setPreviewMode] = useState<boolean>(false);
    const tabIndex = props.currentSlideIndex === props.index ? 1 : -1;

    return (
        <Box sx={{ ...props.sx, height: "100%" }}>
            <Card className={styles["single-destination"]} color="text.primary" sx={{ position: "relative" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <FormControlLabel
                        control={
                            <Switch
                                onChange={(e) => props.hideNavigation.setValue(e.target.checked)} //
                                tabIndex={tabIndex}
                                checked={props.hideNavigation.value}
                            />
                        } //
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
                        control={<Switch onChange={(e) => setPreviewMode(e.target.checked)} tabIndex={tabIndex} />} //
                        label="Preview mode"
                        sx={{
                            bgcolor: "action.hover",
                            pr: 2,
                            m: 0,
                            borderRadius: "5px",
                        }}
                    ></FormControlLabel>
                </Box>
                {(() => {
                    if (previewMode) {
                        return (
                            <PreviewMode
                                data={props.data} //
                                tabIndex={tabIndex}
                            ></PreviewMode>
                        );
                    } else {
                        return (
                            <EditMode
                                data={props.data} //
                                updateData={props.updateData}
                                tabIndex={tabIndex}
                            ></EditMode>
                        );
                    }
                })()}
            </Card>
        </Box>
    );
};

export default SingleLandmark;
