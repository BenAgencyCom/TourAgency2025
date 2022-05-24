// Tools
import { useEffect } from "react";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import SelectThumbnail from "@/components/create/_utils/SelectThumbnail";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { actions as createContentActions } from "@/redux/slices/createContent";

interface StageTwoProps {
    thumbnail: StatedDataField<File | null>;
    thumbnailURL: StatedDataField<string | null>;
}

const StageTwo: FunctionComponent<StageTwoProps> = (props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            createContentActions.handleValidationResult({
                disableNavigation: !Boolean(props.thumbnailURL.value),
                reason: "you must select a thumbnail",
            })
        );
    }, [dispatch, props]);

    return (
        <>
            <StageHeader title="Select thumbnail" stageNumber={2}></StageHeader>
            <Fade in={true}>
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <SelectThumbnail thumbnail={props.thumbnail} thumbnailURL={props.thumbnailURL}></SelectThumbnail>
                </div>
            </Fade>
        </>
    );
};

export default StageTwo;
