// Tools
import { createContext } from "react";
// Types
import type { Continent } from "@prisma/client";
import type { CountryType } from "@/data/countries";
import type { StatedDataField } from "@/@types/StatedDataField";

interface CreateDestinationContext {
    city: StatedDataField<string>;
    country: StatedDataField<CountryType | null>;
    continent: StatedDataField<Continent>;
    population: StatedDataField<number>;
    thumbnail: StatedDataField<File | null>;
    shortDescription: StatedDataField<string>;
    /** dynamically generated by `Reader.readAsDataURL` url of selected thumbnail */
    thumbnailURL: StatedDataField<string | null>;
}

export const CreateDestinationContext = createContext<CreateDestinationContext>({} as any);