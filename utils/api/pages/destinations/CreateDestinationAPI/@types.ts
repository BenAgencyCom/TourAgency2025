// Types
import type { CountryType } from "@/data/countries";
import type { Destination, Continent } from "@prisma/client";
import type { DescriptionContentField } from "@/@types/Description";

export interface ParsedRequestBody {
    city: Destination["city"];
    country: CountryType;
    continent: Continent;
    population: Destination["population"];
    shortDescription: Destination["shortDescription"];
    description: DescriptionContentField[];
}
