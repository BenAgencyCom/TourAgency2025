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
});

const SingleDestinationContent: FunctionComponent<SingleDestinationContentProps> = (props) => {
    return (
        <Wrapper>
            {props.data.map((element: DestinationContentField) => {
                switch (element.type) {
                    case FieldType.HEADER:
                        return <Header data={element}></Header>;
                    case FieldType.PARAGRAPH:
                        return <Paragraph data={element}></Paragraph>;
                    case FieldType.IMAGE:
                        return <ImageField imageURL={props.imageLoader(element.url as string)}></ImageField>;
                }
            })}
        </Wrapper>
    );
};

export default SingleDestinationContent;
