// Types
import type { FunctionComponent } from "react";
// Other Components
import Link from "next/link";
// Styled Components
import ButtonWithLineTransition from "@/components/_utils/styled/ButtonWithLineTransition";

interface ReadMoreProps {
    slug: string;
}
const ReadMore: FunctionComponent<ReadMoreProps> = (props) => {
    return (
        <Link passHref href={`/destinations/${props.slug}`}>
            <a>
                <ButtonWithLineTransition primary reverse sx={{ fontSize: "1.1rem" }}>
                    Read more
                </ButtonWithLineTransition>
            </a>
        </Link>
    );
};

export default ReadMore;
