import type { NextApiRequest } from "next";
import type { CountryType } from "@/data/countries";
import { Continent } from "@prisma/client";
import { Landmark } from "@/@types/pages/admin/create_destination/Landmark";
import { DescriptionContentField } from "@/@types/Description";

type JSON<T> = T | string;

export interface CreateDestinationRequestPardesBody {
    city: string;
    country: CountryType;
    population: number;
    continent: Continent;
    quickDescription: string;
    description: DescriptionContentField[];
    landmarks: Omit<Landmark, "picture">[];
}
export interface CreateDestinationRequest extends NextApiRequest {
    body: {
        city: string;
        country: JSON<CountryType>;
        population: number;
        continent: Continent;
        quickDescription: string;
        description: JSON<DescriptionContentField[]>;
        landmarks: JSON<Omit<Landmark, "picture">[]>;
    };
}
