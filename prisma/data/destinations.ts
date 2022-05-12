// Tools
import { generateDescriptionHeader, generateShortDescription, generateDescriptionParagraph, generateDescriptionSplittedParagraph } from "./_prisma_seeders_utils";
// Types
import type { SeederDataList, Destination } from "./@types";
import type { DestinationContentField, HeaderContentField, ParagraphContentField, ImageContentField, SplittedContentField } from "../../@types/Description";

const createDescription = () => {
    return JSON.parse(
        JSON.stringify([
            {
                type: 2,
                src: null,
                url: "description_1",
            } as ImageContentField,
            {
                type: 0,
                header: generateDescriptionHeader(),
            } as HeaderContentField,
            {
                type: 1,
                content: generateDescriptionParagraph(),
            } as ParagraphContentField,
            {
                type: 3,
                left: {
                    type: 1,
                    content: generateDescriptionSplittedParagraph(),
                } as ParagraphContentField,
                right: {
                    type: 2,
                    src: null,
                    url: "description_2",
                } as ImageContentField,
            } as SplittedContentField,
            {
                type: 0,
                header: generateDescriptionHeader(),
            } as HeaderContentField,
            {
                type: 1,
                content: generateDescriptionParagraph(),
            } as ParagraphContentField,
            {
                type: 3,
                left: {
                    type: 2,
                    src: null,
                    url: "description_3",
                } as ImageContentField,
                right: {
                    type: 1,
                    content: generateDescriptionSplittedParagraph(),
                } as ParagraphContentField,
            } as SplittedContentField,
        ] as DestinationContentField[])
    );
};

export default [
    {
        id: "KRAKOW",
        city: "Kraków",
        continent: "Europe",
        country: "Poland",
        countryCode: "pl",
        folder: "krakow",
        city_lowercase: "krakow",
        country_lowercase: "poland",
        _imagesDir: "destinations/krakow",
        population: 700000,
        shortDescription: generateShortDescription(),
        slug: "krakow",
        description: createDescription(),
    },
    {
        id: "WARSZAWA",
        city: "Warszawa",
        continent: "Europe",
        country: "Poland",
        countryCode: "pl",
        folder: "warszawa",
        city_lowercase: "warszawa",
        country_lowercase: "poland",
        _imagesDir: "destinations/warszawa",
        population: 1700000,
        shortDescription: generateShortDescription(),
        slug: "wwa",
        description: createDescription(),
    },
    {
        id: "VANCOUVER",
        city: "Vancouver",
        continent: "North_America",
        country: "Canada",
        countryCode: "ca",
        folder: "vancouver",
        city_lowercase: "vancouver",
        country_lowercase: "canada",
        _imagesDir: "destinations/vancouver",
        population: 675218,
        shortDescription: generateShortDescription(),
        slug: "vancouver",
        description: createDescription(),
    },
    {
        id: "RIO_DE_JANEIRO",
        city: "Rio de Janeiro",
        continent: "South_America",
        country: "Brazil",
        countryCode: "br",
        folder: "rio_de_janeiro",
        city_lowercase: "rio de janeiro",
        country_lowercase: "brazil",
        _imagesDir: "destinations/rio_de_janeiro",
        population: 6752180,
        shortDescription: generateShortDescription(),
        slug: "rio_de_janeiro",
        description: createDescription(),
    },
    {
        id: "CAPE_TOWN",
        city: "Cape Town",
        continent: "Africa",
        country: "South Africa",
        countryCode: "za",
        folder: "cape_town",
        city_lowercase: "cape town",
        country_lowercase: "south africa",
        _imagesDir: "destinations/cape_town",
        population: 4752180,
        shortDescription: generateShortDescription(),
        slug: "cape_town",
        description: createDescription(),
    },
    {
        id: "HAMBURG",
        city: "Hamburg",
        continent: "Europe",
        country: "Germany",
        countryCode: "de",
        folder: "hamburg",
        city_lowercase: "hamburg",
        country_lowercase: "germany",
        _imagesDir: "destinations/hamburg",
        population: 1852180,
        shortDescription: generateShortDescription(),
        slug: "hamburg",
        description: createDescription(),
    },
    {
        id: "TOKYO",
        city: "Tokyo",
        continent: "Asia",
        country: "Japan",
        countryCode: "jp",
        folder: "tokyo",
        city_lowercase: "tokyo",
        country_lowercase: "japan",
        _imagesDir: "destinations/tokyo",
        population: 13752180,
        shortDescription: generateShortDescription(),
        slug: "tokyo",
        description: createDescription(),
    },
].reverse() as SeederDataList<Destination>;
