// Types
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/Description";
import { DescriptionContentField } from "@/@types/Description";
// Other components
import Header from "./Header";
import ImageField from "./Image";
import Splitted from "./Splitted";
import Paragraph from "./Paragraph";

interface SingleContentFieldProps {
    field: DescriptionContentField;
    imageLoader: (url: string) => string;
}

const SingleContentField: FunctionComponent<SingleContentFieldProps> = (props) => {
    const { imageLoader, field } = props;

    switch (field.type) {
        case FieldType.HEADER:
            return <Header data={field}></Header>;
        case FieldType.PARAGRAPH:
            return <Paragraph data={field}></Paragraph>;
        case FieldType.IMAGE:
            return <ImageField imageURL={imageLoader(field.url as string)}></ImageField>;
        case FieldType.SPLITTED:
            return <Splitted data={field} imageLoader={imageLoader}></Splitted>;
    }
};

export default SingleContentField;
