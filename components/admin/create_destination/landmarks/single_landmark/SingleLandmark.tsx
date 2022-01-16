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
// Redux
import { useAppDispatch } from "@/redux/hooks";
import { deleteItem } from "@/redux/slices/landmarks";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

interface SingleLandmarkProps {
    currentSlideIndex: number;
    index: number;
    data: { id: string } & Landmark;
    isValid: boolean;
    sx?: Record<string, unknown>;
    hideNavigation: StatedDataField<boolean>;
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const dispatch = useAppDispatch();
    const [previewMode, setPreviewMode] = useState<boolean>(false);
    const tabIndex = props.currentSlideIndex === props.index ? 1 : -1;

    const deleteThisLandmark = () => dispatch(deleteItem({ itemToDelete: props.data }));

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
                                data={props.data} //
                                tabIndex={tabIndex}
                            ></PreviewMode>
                        );
                    } else {
                        return (
                            <EditMode
                                data={props.data} //
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
