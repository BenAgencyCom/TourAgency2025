import { useState } from "react";
// Types
import type { FunctionComponent } from "react";
import type { Landmark } from "@/@types/pages/admin/create_destination/Landmark";
import type { StatedDataField } from "@/@types/StatedDataField";
import { ListItem } from "@/@types/redux";
// Material UI Components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// Other components
import PreviewMode from "./PreviewMode";
import EditMode from "./EditMode";
import Actions from "./action/Actions";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

interface SingleLandmarkProps {
    currentSlideIndex: number;
    index: number;
    landmark: ListItem<Landmark>;
    isValid: boolean;
    sx?: Record<string, unknown>;
    hideNavigation: StatedDataField<boolean>;
    goToPreviousSlide: () => void;
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const [previewMode, setPreviewMode] = useState<boolean>(false);
    const tabIndex = props.currentSlideIndex === props.index ? 1 : -1;

    const deleteThisLandmark = () => {
        props.landmark.remove();
        props.goToPreviousSlide();
    };

    return (
        <Box sx={{ ...props.sx, height: "100%" }}>
            <Card className={styles["single-destination"]} color="text.primary" sx={{ position: "relative" }}>
                <Actions
                    hideNavigation={props.hideNavigation} //
                    tabIndex={tabIndex}
                    isValid={props.isValid}
                    previewMode={previewMode}
                    deleteThisLandmark={deleteThisLandmark}
                    setPreviewMode={setPreviewMode}
                ></Actions>

                {(() => {
                    if (previewMode) {
                        return (
                            <PreviewMode
                                landmark={props.landmark.data} //
                                tabIndex={tabIndex}
                            ></PreviewMode>
                        );
                    } else {
                        return (
                            <EditMode
                                landmark={props.landmark} //
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
