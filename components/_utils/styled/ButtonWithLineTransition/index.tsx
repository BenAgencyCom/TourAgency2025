// Types
import type { FunctionComponent } from "react";
import type { ButtonWithLineTransitionProps } from "./@types";
// Styled components
import ButtonWrapper from "./ButtonWrapper";

const ButtonWithLineTransition: FunctionComponent<ButtonWithLineTransitionProps> = (props) => {
    const { children, ...styledProps } = props;

    return (
        <ButtonWrapper {...styledProps}>
            <span className="bwlt-line"></span>
            <span className="bwlt-text">{props.children}</span>
        </ButtonWrapper>
    );
};

export default ButtonWithLineTransition;
