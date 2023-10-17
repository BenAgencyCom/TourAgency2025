// Tools
import faker from "faker";
// Types
import { FieldType } from "@/@types/Description";
import type { ValidLandmarkData } from "./@types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (DESTINATION_ID: string): ValidLandmarkData => {
    return {
        destinationId: DESTINATION_ID,
        //
        type: "ANTIQUE",
        title: faker.lorem.words(10).slice(0, 50),
        shortDescription: faker.lorem.words(30).slice(0, 150),
        description: [
            {
                type: FieldType.HEADER,
                header: faker.lorem.words(10).slice(0, 50),
            },
            {
                type: FieldType.SPLITTED,
                left: {
                    type: FieldType.IMAGE,
                    src: null,
                    url: "description_1",
                },
                right: {
                    type: FieldType.IMAGE,
                    src: null,
                    url: "description_2",
                },
            },
            {
                type: FieldType.PARAGRAPH,
                content: faker.lorem.words(300).slice(0, 400),
            },
            {
                type: FieldType.IMAGE,
                src: null,
                url: "description_3",
            },
        ] as any,
        thumbnail: true,
    };
};
