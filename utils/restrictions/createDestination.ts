// Tools
import createDescriptionRestrictions from "./createDescription";
// Types
import type { Restriction } from "@/@types/Restriction";
import type { CreateDescriptionRestrictions } from "./createDescription";

const createRestriction = (min: number, max: number): Restriction => ({ min, max });

interface CreateLandmarkRestrictions {
    city: Restriction;
    shortDescription: Restriction;
    description: CreateDescriptionRestrictions;
    country: {
        label: Restriction;
        phone: Restriction;
    };
}

export default {
    city: createRestriction(3, 50),
    shortDescription: createRestriction(10, 150),
    description: createDescriptionRestrictions,
    country: {
        label: createRestriction(3, 60),
        phone: createRestriction(1, 10),
    },
} as CreateLandmarkRestrictions;
