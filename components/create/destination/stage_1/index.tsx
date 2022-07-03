// Tools
// Types
import type { FunctionComponent } from "react";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";

interface CreateDestinationStage1Props {
    //
}

const CreateDestinationStage1: FunctionComponent<CreateDestinationStage1Props> = (props) => {
    return (
        <>
            <StageHeader title="General information" stageNumber={1} />
            <span>City</span>
            <span>Country</span>
            <span>Continent</span>
            <span>Short description</span>
            <span>Population</span>
        </>
    );
};

export default CreateDestinationStage1;
