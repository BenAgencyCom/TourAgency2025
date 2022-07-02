// Tools
// Types
import type { FunctionComponent } from "react";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";

interface CreateDestinationStage3Props {
    //
}

const CreateDestinationStage3: FunctionComponent<CreateDestinationStage3Props> = (props) => {
    return (
        <>
            <StageHeader title="General information" stageNumber={3} />
            <span>Stage 3</span>
        </>
    );
};

export default CreateDestinationStage3;
