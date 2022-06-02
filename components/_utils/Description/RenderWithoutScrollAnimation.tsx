// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { DescriptionContentField } from "@/@types/Description";
// Other components
import SingleContentField from "./SingleContentField";
// Styled components
const SingleFieldWrapper = styled("div")(({ theme }) => ({
    width: "100%",
}));

interface RenderContentWithoutScrollAnimationProps {
    data: DescriptionContentField[];
    imageLoader: (url: string) => string;
}

const RenderContentWithoutScrollAnimation: FunctionComponent<RenderContentWithoutScrollAnimationProps> = (props) => {
    return (
        <>
            {props.data.map((element: DescriptionContentField, index: number) => {
                return (
                    <SingleFieldWrapper key={index}>
                        <SingleContentField field={element} imageLoader={props.imageLoader}></SingleContentField>
                    </SingleFieldWrapper>
                );
            })}
        </>
    );
};

export default RenderContentWithoutScrollAnimation;
