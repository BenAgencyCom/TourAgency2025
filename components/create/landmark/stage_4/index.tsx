// Tools
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { DescriptionContentField } from "@/@types/Description";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import Description from "./description/Description";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";

interface StageOneProps {
    description: StatedDataField<DescriptionContentField[]>;
}

const StageOne: FunctionComponent<StageOneProps> = (props) => {
    return (
        <>
            <StageHeader title="Description" stageNumber={4}></StageHeader>
            {/* <StyledButton sx={{ mr: "10px" }}>Add new content field</StyledButton> */}
            {/* <StyledButton>Preview</StyledButton> */}

            <Description></Description>
        </>
    );
};

export default StageOne;
