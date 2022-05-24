// Tools
import RWD from "./RWD";
import dynamic from "next/dynamic";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { DescriptionContentField } from "@/@types/Description";
// Other components
const RenderWithScrollAnimation = dynamic(() => import("./RenderWithScrollAnimation"));
const RenderWithoutScrollAnimation = dynamic(() => import("./RenderWithoutScrollAnimation"));

interface DescriptionProps {
    data: DescriptionContentField[];
    imageLoader: (url: string) => string;
    disableScrollAnimation?: true;
}

const Wrapper = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    cursor: "default",
    ...(RWD as any),
});

const Description: FunctionComponent<DescriptionProps> = (props) => {
    const { data, imageLoader, disableScrollAnimation } = props;
    return (
        <Wrapper>
            {(() => {
                if (disableScrollAnimation) return <RenderWithoutScrollAnimation data={data} imageLoader={imageLoader} />;
                return <RenderWithScrollAnimation data={data} imageLoader={imageLoader} />;
            })()}
        </Wrapper>
    );
};

export default Description;
