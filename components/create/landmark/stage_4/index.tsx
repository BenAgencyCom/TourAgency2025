// Tools
import { useState } from "react";
// Types
import type { FunctionComponent } from "react";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import Description from "./description";

interface StageFourProps {
    //
}

const StageFour: FunctionComponent<StageFourProps> = (props) => {
    const [previewMode, setPreviewMode] = useState<boolean>(false);

    return (
        <>
            <StageHeader title="Description" stageNumber={4}></StageHeader>
            <Description setPreviewMode={setPreviewMode}></Description>
        </>
    );
};

export default StageFour;
