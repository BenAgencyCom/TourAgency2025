// Types
import type { Landmark } from "@prisma/client";
import { FieldType, ParagraphContentField, ImageContentField } from "@/@types/Description";

export interface TestingPurposeImageContentField extends ImageContentField {
    _sendInvalidImage?: boolean;
}

export interface ValidLandmarkData {
    destinationId: Landmark["destinationId"];
    type: Landmark["type"];
    title: Landmark["title"];
    shortDescription: Landmark["shortDescription"];
    thumbnail: boolean;
    description: [
        {
            type: FieldType.HEADER;
            header: string;
        },
        {
            type: FieldType.SPLITTED;
            left: TestingPurposeImageContentField | ParagraphContentField;
            right: TestingPurposeImageContentField | ParagraphContentField;
        },
        {
            type: FieldType.PARAGRAPH;
            content: string;
        },
        TestingPurposeImageContentField
    ];
}
