// Tools
// Types
import type { FunctionComponent } from "react";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";

interface StageOneProps {
    //
}

const StageOne: FunctionComponent<StageOneProps> = (props) => {
    return (
        <>
            <StageHeader title="Select destination" stageNumber={1}></StageHeader>
        </>
    );
};

export default StageOne;
