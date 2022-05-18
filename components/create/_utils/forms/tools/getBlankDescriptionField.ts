// Types
import { FieldType } from "@/@types/Description";
import type { DescriptionContentField, HeaderContentField, ParagraphContentField, ImageContentField, SplittedContentField } from "@/@types/Description";

export const HeaderBlankField = {
    type: FieldType.HEADER,
    header: "",
} as HeaderContentField;

export const ParagraphBlankField = {
    type: FieldType.PARAGRAPH,
    content: "",
} as ParagraphContentField;

export const ImageBlankField = {
    type: FieldType.IMAGE,
    src: null,
    url: "",
} as ImageContentField;

export const SplittedBlankField = {
    type: FieldType.SPLITTED,
    left: ParagraphBlankField,
    right: ImageBlankField,
} as SplittedContentField;

// eslint-disable-next-line import/no-anonymous-default-export
export default (type: FieldType): DescriptionContentField => {
    if (type === FieldType.HEADER) return HeaderBlankField;
    else if (type === FieldType.PARAGRAPH) return ParagraphBlankField;
    else if (type === FieldType.IMAGE) return ImageBlankField;
    return SplittedBlankField;
};
