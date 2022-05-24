// Tools
import { useState } from "react";
// Types
import type { FunctionComponent, Dispatch, SetStateAction } from "react";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import Description from "./description";

interface StageFourProps {
    setDisableNavigation: Dispatch<SetStateAction<boolean>>;
    setDisabledNavigationJustification: Dispatch<SetStateAction<string>>;
}

const StageFour: FunctionComponent<StageFourProps> = (props) => {
    const [previewMode, setPreviewMode] = useState<boolean>(false);

    return (
        <>
            <StageHeader title="Description" stageNumber={4}></StageHeader>

            <Description
                setPreviewMode={setPreviewMode} //
                setDisableNavigation={props.setDisableNavigation}
                setDisabledNavigationJustification={props.setDisabledNavigationJustification}
            ></Description>
        </>
    );
};

export default StageFour;
