// Types
import type { FunctionComponent } from "react";
import type { DescriptionContentField } from "@/@types/Description";
// Other components
import SingleContentField from "./SingleContentField";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";

interface RenderContentWithScrollAnimationProps {
    data: DescriptionContentField[];
    imageLoader: (url: string) => string;
}

const RenderContentWithScrollAnimation: FunctionComponent<RenderContentWithScrollAnimationProps> = (props) => {
    return (
        <>
            {props.data.map((element: DescriptionContentField, index: number) => (
                <UnfadeOnScroll key={index} fullSize>
                    <SingleContentField field={element} imageLoader={props.imageLoader}></SingleContentField>
                </UnfadeOnScroll>
            ))}
        </>
    );
};

export default RenderContentWithScrollAnimation;
