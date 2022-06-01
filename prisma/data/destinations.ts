// Tools
import { generateDescriptionHeader, generateShortDescription, generateDescriptionParagraph, generateDescriptionSplittedParagraph } from "./_prisma_seeders_utils";
// Types
import type { SeederDataList, Destination, SeederDataItem } from "./@types";
import type { DescriptionContentField, HeaderContentField, ParagraphContentField, ImageContentField, SplittedContentField } from "../../@types/Description";
import { Continent } from "@prisma/client";

interface ShortenDestination {
    id: string;
    city: string;
    continent: Continent;
    country: string;
    countryCode: string;
    population: number;
    slug: string;
}

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
        ] as DescriptionContentField[])
    );
};

export default (
    [
        {
            id: "KRAKOW",
            city: "Kraków",
            continent: "Europe",
            country: "Poland",
            countryCode: "pl",
            population: 700000,
            slug: "krakow",
        },
        {
            id: "WARSZAWA",
            city: "Warszawa",
            continent: "Europe",
            country: "Poland",
            countryCode: "pl",
            population: 1700000,
            slug: "warszawa",
        },
        {
            id: "VANCOUVER",
            city: "Vancouver",
            continent: "North_America",
            country: "Canada",
            countryCode: "ca",
            population: 675218,
            slug: "vancouver",
        },
        {
            id: "RIO_DE_JANEIRO",
            city: "Rio de Janeiro",
            continent: "South_America",
            country: "Brazil",
            countryCode: "br",
            population: 6752180,
            slug: "rio_de_janeiro",
        },
        {
            id: "CAPE_TOWN",
            city: "Cape Town",
            continent: "Africa",
            country: "South Africa",
            countryCode: "za",
            population: 4752180,
            slug: "cape_town",
        },
        {
            id: "HAMBURG",
            city: "Hamburg",
            continent: "Europe",
            country: "Germany",
            countryCode: "de",
            population: 1852180,
            slug: "hamburg",
        },
        {
            id: "TOKYO",
            city: "Tokyo",
            continent: "Asia",
            country: "Japan",
            countryCode: "jp",
            population: 13752180,
            slug: "tokyo",
        },
    ] as ShortenDestination[]
)
    .map((_el) => {
        const el = _el as unknown as SeederDataItem<Destination>;

        el.folder = el.slug;
        el.city_lowercase = el.city.toLowerCase();
        el.country_lowercase = el.country.toLowerCase();
        el._imagesDir = `destinations/${el.slug}`;
        el.shortDescription = generateShortDescription();
        el.description = createDescription();
        el.status = "APPROVED";

        return el as any;
    })
    .reverse() as SeederDataList<Destination>;
