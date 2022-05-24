// Types
import type { FunctionComponent } from "react";
// Other components
import Preview from "./Preview";
import StageHeader from "@/components/create/_utils/StageHeader";
import Description from "@/components/create/_utils/description";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

const StageFour: FunctionComponent = (props) => {
    const { previewMode } = useAppSelector((state) => state.createContent);

    return (
        <>
            <StageHeader title={previewMode ? "Description- Preview" : "Description"} stageNumber={4}></StageHeader>
            {(() => {
                if (previewMode) return <Preview />;
                else return <Description />;
            })()}
        </>
    );
};

export default StageFour;
