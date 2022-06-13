// Types
import type { FunctionComponent } from "react";
import type { ButtonWithLineTransitionProps } from "@/components/_utils/styled/ButtonWithLineTransition/@types";
// Other Components
import Link from "next/link";
// Styled Components
import ButtonWithLineTransition from "@/components/_utils/styled/ButtonWithLineTransition";

interface SingleRedirectProps extends ButtonWithLineTransitionProps {
    url?: string;
    onClick?: () => any;
}

const SingleRedirect: FunctionComponent<SingleRedirectProps> = (props) => {
    const { url, children, ...propsToForward } = props;

    const Button = (
        <ButtonWithLineTransition
            primary //
            sx={{
                fontSize: "1rem", //
                letterSpacing: "1px",
            }}
            background="transparent"
            line="right"
            className="contrast-color"
            {...propsToForward}
        >
            {children}
        </ButtonWithLineTransition>
    );

    if (url) {
        return (
            <Link passHref href={url}>
                <a tabIndex={-1}>{Button}</a>
            </Link>
        );
    }

    return <a tabIndex={-1}>{Button}</a>;
};

export default SingleRedirect;
