// Tools
import { useState } from "react";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent } from "react";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import Description from "./description";

const StageOne: FunctionComponent = (props) => {
    const [previewMode, setPreviewMode] = useState<boolean>(false);

    return (
        <>
            <StageHeader title="Description" stageNumber={4}></StageHeader>

            <Description previewMode={stated(previewMode, setPreviewMode)}></Description>
        </>
    );
};

export default StageOne;
