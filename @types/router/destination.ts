import type { NextApiRequest, NextApiResponse } from "next";
import type { CountryType } from "@/data/countries";
import { Continent } from "@prisma/client";
import { Landmark } from "@/@types/Landmark";
import { DestinationContentField } from "@/@types/DestinationDescription";

type JSON<T> = T | string;

export interface CreateDestinationRequestPardesBody {
    city: string;
    country: CountryType;
    population: string;
    continent: Continent;
    quickDescription: string;
    description: DestinationContentField[];
    landmarks: Omit<Landmark, "picture">[];
}
export interface CreateDestinationRequest extends NextApiRequest {
    body: {
        city: string;
        country: JSON<CountryType>;
        population: string;
        continent: Continent;
        quickDescription: string;
        description: JSON<DestinationContentField[]>;
        landmarks: JSON<Omit<Landmark, "picture">[]>;
    };
}
