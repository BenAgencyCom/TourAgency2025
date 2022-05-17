// Tools
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import SelectThumbnail from "@/components/create/_utils/SelectThumbnail";

interface StageTwoProps {
    thumbnail: StatedDataField<File | null>;
    thumbnailURL: StatedDataField<string | null>;
}

const StageTwo: FunctionComponent<StageTwoProps> = (props) => {
    const { thumbnail, thumbnailURL } = props;
    return (
        <>
            <StageHeader title="Select thumbnail" stageNumber={2}></StageHeader>
            <SelectThumbnail thumbnail={thumbnail} thumbnailURL={thumbnailURL}></SelectThumbnail>
        </>
    );
};

export default StageTwo;
