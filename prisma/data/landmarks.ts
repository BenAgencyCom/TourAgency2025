// Tools
import { generateDescriptionHeader, generateShortDescription, generateDescriptionParagraph, generateDescriptionSplittedParagraph } from "./_prisma_seeders_utils";
// Types
import { LandmarkType } from "@prisma/client";
import type { SeederDataList, Landmark, SeederDataItem } from "./@types";
import type { DescriptionContentField, HeaderContentField, ParagraphContentField, ImageContentField, SplittedContentField } from "../../@types/Description";

type DestinationID = "KRAKOW" | "WARSZAWA" | "VANCOUVER" | "RIO_DE_JANEIRO" | "CAPE_TOWN" | "HAMBURG" | "TOKYO";

interface ShortenLandmark {
    type: LandmarkType;
    destinationId: DestinationID;
    slug: string;
    title: string;
}

const generateDescription = () => {
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
                type: 3,
                left: {
                    type: 1,
                    content: generateDescriptionSplittedParagraph(),
                } as ParagraphContentField,
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
        // KRAKOW
        {
            type: "RESTAURANT",
            destinationId: "KRAKOW",
            slug: "krakow_nolio",
            title: "Restauracja Nolio",
        },
        {
            type: "MONUMENT",
            destinationId: "KRAKOW",
            slug: "krakow_kopiec_kosciuszki",
            title: "Kopiec Tadeusza Kosciuszki",
        },
        {
            type: "BUILDING",
            destinationId: "KRAKOW",
            slug: "krakow_teatr_slowackiego",
            title: "Teatr Juliusza Słowackiego",
        },
        {
            type: "BUILDING",
            destinationId: "KRAKOW",
            slug: "krakow_wawel",
            title: "Zamek krolewski na Wawelu",
        },
        // WARSZAWA
        {
            type: "MUSEUM",
            destinationId: "WARSZAWA",
            slug: "www_centrum_nauki_kopernik",
            title: "Centrum Nauki Kopernik",
        },
        {
            type: "BUILDING",
            destinationId: "WARSZAWA",
            slug: "wwa_palac",
            title: "Palac kultury i nauki",
        },
        {
            type: "ANTIQUE",
            destinationId: "WARSZAWA",
            slug: "wwa_stare_miasto",
            title: "Stare Miasto",
        },
        {
            type: "BUILDING",
            destinationId: "WARSZAWA",
            slug: "wwa_stadion",
            title: "Stadion PGE Narodowy",
        },
        // VANCOUVER
        {
            type: "NATURE",
            destinationId: "VANCOUVER",
            slug: "vancouver_two_jacks_lake",
            title: "Two Jacks Lake",
        },
        {
            type: "BUILDING",
            destinationId: "VANCOUVER",
            slug: "vancouver_science_world",
            title: "Science World",
        },
        {
            type: "MONUMENT",
            destinationId: "VANCOUVER",
            slug: "vancouver_pale_totem",
            title: "The Pale Totem",
        },
        {
            type: "RESTAURANT",
            destinationId: "VANCOUVER",
            slug: "vancouver_pan_pacific_vancouver",
            title: "Pan Pacific Hotel Vancouver",
        },
        // RIO_DE_JANEIRO
        {
            type: "NATURE",
            destinationId: "RIO_DE_JANEIRO",
            slug: "rio_de_janeiro_sugarloaf_mountain",
            title: "Sugarloaf Montaña",
        },
        {
            type: "NATURE",
            destinationId: "RIO_DE_JANEIRO",
            slug: "rio_de_janeiro_caracol_waterfall",
            title: "Caracol cascada",
        },
        {
            type: "MONUMENT",
            destinationId: "RIO_DE_JANEIRO",
            slug: "rio_de_janeiro_jezus",
            title: "Estatua del Cristo Redentor en Río de Janeiro",
        },
        {
            type: "ART",
            destinationId: "RIO_DE_JANEIRO",
            slug: "rio_de_janeiro_boulevard_olimpico",
            title: "Boulevard Olímpico",
        },
        // Cape Town
        {
            type: "BUILDING",
            destinationId: "CAPE_TOWN",
            slug: "cape_town_stadium",
            title: "Cape Town Stadium",
        },
        {
            type: "NATURE",
            destinationId: "CAPE_TOWN",
            slug: "cape_town_duiker_island",
            title: "Duiker Island",
        },
        {
            type: "BUILDING",
            destinationId: "CAPE_TOWN",
            slug: "cape_town_table_bay_harbour",
            title: "Table Bay Harbour",
        },
        {
            type: "NATURE",
            destinationId: "CAPE_TOWN",
            slug: "cape_town_bay_beach",
            title: "Cape Bay Beach",
        },
        // HAMBURG
        {
            type: "BUILDING",
            destinationId: "HAMBURG",
            slug: "hamburg_rathaus",
            title: "Rathaus Hamburg",
        },
        {
            type: "BUILDING",
            destinationId: "HAMBURG",
            slug: "hamburg_elbphilharmonie",
            title: "Elbphilharmonie",
        },
        {
            type: "BUILDING",
            destinationId: "HAMBURG",
            slug: "hamburg_hafen",
            title: "Hamburg Hafen",
        },
        {
            type: "NATURE",
            destinationId: "HAMBURG",
            slug: "hamburg_fiction_park",
            title: "Fiction Park",
        },
        // Tokyo
        {
            type: "BUILDING",
            destinationId: "TOKYO",
            slug: "tokyo_shibuya",
            title: "Shibuya",
        },
        {
            type: "MONUMENT",
            destinationId: "TOKYO",
            slug: "tokyo_senso_ji_temple",
            title: "Sensō-ji",
        },
        {
            type: "NATURE",
            destinationId: "TOKYO",
            slug: "tokyo_shinjuku_gyoen",
            title: "Shinjuku Gyoen",
        },
        {
            type: "ART",
            destinationId: "TOKYO",
            slug: "tokyo_disneyland",
            title: "Tokyo Disneyland",
        },
    ] as ShortenLandmark[]
).map((_el, index: number) => {
    const el = _el as unknown as SeederDataItem<Landmark>;
    //
    el.folder = el.slug;
    if (el.status === undefined) el.status = "APPROVED";
    el.id = String(index + 1);
    el._imagesDir = `landmarks/${el.slug}`;
    el.title_lowercase = el.title ? el.title.toLowerCase() : "testing landmark";
    el.description = generateDescription();
    el.shortDescription = generateShortDescription();
    //
    return el;
}) as SeederDataList<Landmark>;
