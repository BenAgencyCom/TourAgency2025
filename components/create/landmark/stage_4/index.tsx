// Tools
import { useState } from "react";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import Description from "./description";

interface StageFourProps {
    disableContinueButton: StatedDataField<boolean>;
}

const StageOne: FunctionComponent<StageFourProps> = (props) => {
    const [previewMode, setPreviewMode] = useState<boolean>(false);

    return (
        <>
            <StageHeader title="Description" stageNumber={4}></StageHeader>

            <Description
                previewMode={stated(previewMode, setPreviewMode)} //
                disableContinueButton={props.disableContinueButton}
            ></Description>
        </>
    );
};

export default StageOne;
