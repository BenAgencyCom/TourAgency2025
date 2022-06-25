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
    const { stage, disabled } = props;
    const onClick = () => {
        if (disabled) return;
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        // Change stage
        setTimeout(() => {
            if (stage.value === "PERSONAL_DATA") stage.setValue("CONFIRMATION");
            else if (stage.value === "CONFIRMATION") stage.setValue("RESULT");
        }, 100);
    };
    return (
        <ContinueButtonBase
            primary //
            disabled={disabled}
            onClick={onClick}
        >
            Continue
        </ContinueButtonBase>
    );
};

export default ContinueButton;
