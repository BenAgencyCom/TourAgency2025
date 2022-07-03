// Tools
import faker from "faker";
// Types
import { FieldType } from "@/@types/Description";
import type { ValidDestinationData } from "./@types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (): ValidDestinationData => {
    return JSON.parse(
        JSON.stringify({
            city: faker.lorem.words(2).slice(0, 20),
            shortDescription: faker.lorem.words(30).slice(0, 150),
            country: {
                code: "NO",
                label: "Norway",
                phone: "47",
            },
            population: 10000,
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
                    content: faker.lorem.words(300).slice(0, 1000),
                },
                {
                    type: FieldType.IMAGE,
                    src: null,
                    url: "description_3",
                },
            ] as any,
            thumbnail: true,
            continent: "Europe",
        } as ValidDestinationData)
    );
};
