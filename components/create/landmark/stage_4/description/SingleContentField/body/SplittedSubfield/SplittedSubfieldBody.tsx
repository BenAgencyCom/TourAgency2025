// Tools
import restrictions from "@/utils/restrictions/createLandmark";
// Types
import type { FunctionComponent } from "react";
import { FieldType } from "@/@types/Description";
import type { SplittedSubfieldField, ParagraphContentField, ImageContentField } from "@/@types/Description";
// Other components
import ParagraphBody from "../Paragraph";
import ImageBody from "../Image";

interface SplittedSubfieldBodyProps {
    data: SplittedSubfieldField;
    updateSubField: (data: SplittedSubfieldField) => void;
    isDragging: boolean;
}

const SplittedSubfieldBody: FunctionComponent<SplittedSubfieldBodyProps> = (props) => {
    const updateSinglePropOfSubfield = <T extends SplittedSubfieldField>(prop: keyof T, val: T[typeof prop]) => {
        const newData = Object.assign({}, props.data) as T;
        newData[prop] = val;
        if (props.data.type === FieldType.IMAGE && prop !== "src") {
            (newData as ImageContentField).src = props.data.src;
        }
        props.updateSubField(newData);
    };

    switch (props.data.type) {
        case FieldType.PARAGRAPH:
            return (
                <ParagraphBody
                    split
                    content={props.data.content}
                    updateSingleProp={(prop: keyof ParagraphContentField, val: ParagraphContentField[typeof prop]) => {
                        updateSinglePropOfSubfield<ParagraphContentField>(prop, val);
                    }}
                    restrictions={restrictions.description.paragraph}
                ></ParagraphBody>
            );
        case FieldType.IMAGE:
            const updateImage = (data: { src: File; url: string }) => {
                if (props.data.type === FieldType.IMAGE) {
                    props.updateSubField({
                        type: FieldType.IMAGE,
                        ...data,
                    });
                }
            };

            return (
                <ImageBody
                    split
                    url={props.data.url as string}
                    splittedFieldUpdate={updateImage}
                    updateSingleProp={(prop: keyof ImageContentField, val: ImageContentField[typeof prop]) => {
                        updateSinglePropOfSubfield<ImageContentField>(prop, val);
                    }}
                    isDragging={props.isDragging}
                ></ImageBody>
            );
    }
};

export default SplittedSubfieldBody;
