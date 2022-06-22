// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Stage } from "@/components/register/@types";
import type { StatedDataField } from "@/@types/StatedDataField";
// Other components
import StyledButton from "@/components/create/_utils/forms/Button";
// Styled components

const ContinueButtonBase = styled(StyledButton)(({ theme }) => ({
    marginTop: "50px",
    width: "200px",
    ["@media (max-width:1000px)"]: {
        alignSelf: "center",
        width: "100%",
        maxWidth: "400px",
    },
}));

interface ContinueButtonProps {
    allFieldsAreValid: boolean;
    stage: StatedDataField<Stage>;
    disabled: boolean;
}

const ContinueButton: FunctionComponent<ContinueButtonProps> = (props) => {
    return (
        <ContinueButtonBase primary disabled={props.disabled}>
            Continue
        </ContinueButtonBase>
    );
};

export default ContinueButton;
