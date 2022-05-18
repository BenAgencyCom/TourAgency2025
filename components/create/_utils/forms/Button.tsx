// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { ButtonBaseProps } from "@mui/material/ButtonBase";
// Styled components
import ButtonWithColorTransition from "@/components/_utils/styled/ButtonWithColorTransition";

const Button = styled(ButtonWithColorTransition)(({ theme }) => ({
    fontSize: "1.2rem",
    height: "40px",
}));

const FormButton: FunctionComponent<ButtonBaseProps> = (props) => {
    return (
        <Button {...(props as any)} reverse>
            {props.children}
        </Button>
    );
};

export default FormButton;
