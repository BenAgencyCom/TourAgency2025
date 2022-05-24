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
                <UnfadeOnScroll
                    sx={{ width: "100%" }} //
                    key={index}
                    stylesOnUnfold={{
                        "div.image-with-shape::before": {
                            transform: `translate(-50%,-50%) rotate(2deg)`,
                            opacity: 1,
                        },
                        "div.image-with-reversed-shape::before": {
                            transform: `translate(-50%,-50%) rotate(-2deg)`,
                            opacity: 1,
                        },
                    }}
                >
                    <SingleContentField field={element} imageLoader={props.imageLoader}></SingleContentField>
                </UnfadeOnScroll>
            ))}
        </>
    );
};

export default RenderContentWithScrollAnimation;
