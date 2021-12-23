import { useState } from "react";
// Types
import type { FunctionComponent } from "react";
import type { Landmark } from "@/@types/Landmark";
import type { StatedDataField } from "@/@types/StagedDataField";
// Material UI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// Other components
import PreviewMode from "./PreviewMode";
import EditMode from "./EditMode";
import Actions from "./action/Actions";
// Material UI Icons
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

interface SingleLandmarkProps {
    currentSlideIndex: number;
    index: number;
    data: Landmark;
    sx?: Record<string, unknown>;
    updateData: (data: Landmark | "REMOVE_THIS_ELEMENT") => void;
    hideNavigation: StatedDataField<boolean>;
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const [previewMode, setPreviewMode] = useState<boolean>(false);
    const tabIndex = props.currentSlideIndex === props.index ? 1 : -1;

    return (
        <Box sx={{ ...props.sx, height: "100%" }}>
            <Card className={styles["single-destination"]} color="text.primary" sx={{ position: "relative" }}>
                <Actions
                    hideNavigation={props.hideNavigation} //
                    tabIndex={tabIndex}
                    previewMode={previewMode}
                    updateData={props.updateData}
                    setPreviewMode={setPreviewMode}
                ></Actions>

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
