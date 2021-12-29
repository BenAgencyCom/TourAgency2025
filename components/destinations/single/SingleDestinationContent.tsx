// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/DestinationDescription";
import type { DestinationContentField } from "@/@types/DestinationDescription";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import Header from "@/components/destinations/single/Header";
import Paragraph from "@/components/destinations/single/Paragraph";
import ImageField from "@/components/destinations/single/Image";
// Material UI Icons
// Redux
// Styles
interface SingleDestinationContentProps {
    data: DestinationContentField[];
    imageLoader: (url: string) => string;
}

const Wrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    cursor: "default",
});

const SingleDestinationContent: FunctionComponent<SingleDestinationContentProps> = (props) => {
    return (
        <Wrapper>
            {props.data.map((element: DestinationContentField, index: number) => {
                switch (element.type) {
                    case FieldType.HEADER:
                        return <Header data={element} key={index}></Header>;
                    case FieldType.PARAGRAPH:
                        return <Paragraph data={element} key={index}></Paragraph>;
                    case FieldType.IMAGE:
                        return <ImageField imageURL={props.imageLoader(element.url as string)} key={index}></ImageField>;
                }
            })}
        </Wrapper>
    );
};

export default SingleDestinationContent;
