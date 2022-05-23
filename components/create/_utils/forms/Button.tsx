// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { ButtonWithColorTransitionProps } from "@/components/_utils/styled/ButtonWithColorTransition";
// Styled components
import ButtonWithColorTransition from "@/components/_utils/styled/ButtonWithColorTransition";

const Button = styled(ButtonWithColorTransition, {
    shouldForwardProp: (prop: string) => !["iconButton"].includes(prop),
})<{ iconButton?: boolean }>(({ theme, ...props }) => ({
    fontSize: "1.2rem",
    height: "40px",
    ...(props.disabled && {
        border: `2px solid rgb(130,143,156)`,
        background: alpha(theme.palette.text.primary, 0.5),
        color: theme.palette.text.primary,
    }),
    ...(props.iconButton && {
        padding: "0",
        width: "60px",
    }),
}));

interface FormButtonProps extends ButtonWithColorTransitionProps {
    iconButton?: true;
}
const FormButton: FunctionComponent<FormButtonProps> = (props) => {
    return (
        <Button {...(props as any)} reverse>
            {props.children}
        </Button>
    );
};

export default FormButton;
