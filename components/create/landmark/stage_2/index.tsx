// Tools
import { useEffect } from "react";
// Types
import type { FunctionComponent, Dispatch, SetStateAction } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import SelectThumbnail from "@/components/create/_utils/SelectThumbnail";

interface StageTwoProps {
    thumbnail: StatedDataField<File | null>;
    thumbnailURL: StatedDataField<string | null>;
    setDisableNavigation: Dispatch<SetStateAction<boolean>>;
    setDisabledNavigationJustification: Dispatch<SetStateAction<string>>;
}

const StageTwo: FunctionComponent<StageTwoProps> = (props) => {
    useEffect(() => {
        props.setDisableNavigation(!Boolean(props.thumbnailURL.value));
        props.setDisabledNavigationJustification("you must select a thumbnail");
    }, [props]);

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
