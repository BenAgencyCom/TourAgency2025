// Tools
import restrictions from "@/utils/restrictions/createDestination_OLD";
// Types
import { ListItem } from "@/@types/redux";
import { FieldType } from "@/@types/Description";
import type { FunctionComponent } from "react";
import type { DescriptionContentField, HeaderContentField, ParagraphContentField, ImageContentField, SplittedContentField } from "@/@types/Description";
// Other components
import ImageBody from "./Image";
import Splitted from "./Splitted";
import HeaderBody from "./Header";
import ParagraphBody from "./Paragraph";

interface SingleDescriptionFieldBodyProps {
    field: ListItem<DescriptionContentField>;
    refreshKey: number;
    isDragging: boolean;
}

const SingleDescriptionFieldBody: FunctionComponent<SingleDescriptionFieldBodyProps> = (props) => {
    switch (props.field.data.type) {
        case FieldType.HEADER:
            return (
                <HeaderBody
                    field={props.field as ListItem<HeaderContentField>} //
                    restrictions={restrictions.description.header}
                ></HeaderBody>
            );
        case FieldType.PARAGRAPH:
            return <ParagraphBody field={props.field as ListItem<ParagraphContentField>} restrictions={restrictions.description.paragraph}></ParagraphBody>;
        case FieldType.IMAGE:
            return (
                <ImageBody
                    url={(props.field.data as ImageContentField).url} //
                    key={props.refreshKey}
                    updateSingleProp={(prop: keyof ImageContentField, val: ImageContentField[typeof prop]) => {
                        (props.field as ListItem<ImageContentField>).changeProperty(prop, val);
                    }}
                    isDragging={props.isDragging}
                ></ImageBody>
            );
        case FieldType.SPLITTED:
            return (
                <Splitted
                    field={props.field as ListItem<SplittedContentField>} //
                    restrictions={restrictions.description.paragraph}
                    key={props.refreshKey}
                    isDragging={props.isDragging}
                ></Splitted>
            );
    }
};

export default SingleDescriptionFieldBody;
