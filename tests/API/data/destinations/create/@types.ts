// Types
import { FieldType } from "@/@types/Description";
import type { Destination } from "@prisma/client";
import type { CountryType } from "@/data/countries";
import type { SplittedSubfieldField, ImageContentField } from "@/@types/Description";

export interface ValidDestinationData {
    city: Destination["city"];
    continent: Destination["continent"];
    country: CountryType;
    population: Destination["population"];
    shortDescription: Destination["shortDescription"];
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
