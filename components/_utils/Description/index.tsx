// Tools
import RWD from "./RWD";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/Description";
import type { DescriptionContentField } from "@/@types/Description";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import Header from "./Header";
import ImageField from "./Image";
import Splitted from "./Splitted";
import Paragraph from "./Paragraph";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";

interface DescriptionProps {
    data: DescriptionContentField[];
    imageLoader: (url: string) => string;
}

const Wrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    cursor: "default",
    ...(RWD as any),
});

const Description: FunctionComponent<DescriptionProps> = (props) => {
    return (
        <Wrapper>
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
                    {(() => {
                        switch (element.type) {
                            case FieldType.HEADER:
                                return <Header data={element}></Header>;
                            case FieldType.PARAGRAPH:
                                return <Paragraph data={element}></Paragraph>;
                            case FieldType.IMAGE:
                                return <ImageField imageURL={props.imageLoader(element.url as string)}></ImageField>;
                            case FieldType.SPLITTED:
                                return <Splitted data={element} imageLoader={props.imageLoader}></Splitted>;
                        }
                    })()}
                </UnfadeOnScroll>
            ))}
        </Wrapper>
    );
};

export default Description;
