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

interface StageTwoProps {
    thumbnail: StatedDataField<File | null>;
    thumbnailURL: StatedDataField<string | null>;
    disableContinueButton: StatedDataField<boolean>;
}

const StageTwo: FunctionComponent<StageTwoProps> = (props) => {
    const { thumbnail, thumbnailURL } = props;

    useEffect(() => {
        props.disableContinueButton.setValue(!Boolean(thumbnailURL.value));
    }, [thumbnailURL, props.disableContinueButton]);

    return (
        <>
            <StageHeader title="Select thumbnail" stageNumber={2}></StageHeader>
            <Fade in={true}>
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <SelectThumbnail thumbnail={thumbnail} thumbnailURL={thumbnailURL}></SelectThumbnail>
                </div>
            </Fade>
        </>
    );
};

export default StageTwo;
