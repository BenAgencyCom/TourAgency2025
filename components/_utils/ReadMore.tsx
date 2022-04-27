// Types
import type { FunctionComponent } from "react";
// Other Components
import Link from "next/link";
// Styled Components
import ButtonWithLineTransition from "@/components/_utils/styled/ButtonWithLineTransition";

const ReadMore: FunctionComponent<{ url: string }> = (props) => {
    return (
        <Link passHref href={props.url}>
            <a tabIndex={-1} className="read-more">
                <ButtonWithLineTransition primary reverse sx={{ fontSize: "1.2rem", marginTop: "10px" }}>
                    Read more
                </ButtonWithLineTransition>
            </a>
        </Link>
    );
};

export default ReadMore;
