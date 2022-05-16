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
            <StageHeader title="Confirmation" stageNumber={5}></StageHeader>
        </>
    );
};

export default StageOne;
