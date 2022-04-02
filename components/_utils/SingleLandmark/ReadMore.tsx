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
        <Link passHref href={`/landmarks/${props.slug}`}>
            <ButtonWithLineTransition primary reverse>
                Read more
            </ButtonWithLineTransition>
        </Link>
    );
};

export default ReadMore;
