// Tools
// Types
import type { FunctionComponent } from "react";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";

interface CreateDestinationStage4Props {
    //
}

const CreateDestinationStage4: FunctionComponent<CreateDestinationStage4Props> = (props) => {
    return (
        <>
            <StageHeader title="General information" stageNumber={4} />
            <span>Stage 4</span>
        </>
    );
};

export default CreateDestinationStage4;
