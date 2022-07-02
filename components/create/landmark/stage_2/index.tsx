// Tools
import { useEffect } from "react";
import useCreateLandmarkContext from "@/components/create/landmark/hooks/useCreateLandmarkContext";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import SelectThumbnail from "@/components/create/_utils/SelectThumbnail";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { actions as createContentActions } from "@/redux/slices/createContent";

const StageTwo: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const { thumbnail, thumbnailURL } = useCreateLandmarkContext();

    useEffect(() => {
        dispatch(
            createContentActions.handleValidationResult({
                disableNavigation: !Boolean(thumbnailURL.value),
                reason: "you must select a thumbnail",
            })
        );
    }, [dispatch, thumbnailURL]);

    return (
        <>
            <StageHeader title="Select thumbnail" stageNumber={2}></StageHeader>
            <Fade in={true}>
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <SelectThumbnail thumbnail={thumbnail} thumbnailURL={thumbnailURL} />
                </div>
            </Fade>
        </>
    );
};

export default StageTwo;
