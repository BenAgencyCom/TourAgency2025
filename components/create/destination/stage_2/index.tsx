// Tools
// Types
import type { FunctionComponent } from "react";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";

interface CreateDestinationStage2Props {
    //
}

const CreateDestinationStage2: FunctionComponent<CreateDestinationStage2Props> = (props) => {
    return (
        <>
            <StageHeader title="General information" stageNumber={2} />
            <span>Stage 2</span>
        </>
    );
};

export default CreateDestinationStage2;
