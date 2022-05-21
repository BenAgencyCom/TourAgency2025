// Types
import type { Landmark } from "@prisma/client";
import { FieldType, SplittedSubfieldField, ImageContentField } from "@/@types/Description";

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
            left: SplittedSubfieldField;
            right: SplittedSubfieldField;
        },
        {
            type: FieldType.PARAGRAPH;
            content: string;
        },
        ImageContentField
    ];
}
