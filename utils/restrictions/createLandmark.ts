// Tools
import createDescriptionRestrictions from "./createDescription";
// Types
import type { Restriction } from "@/@types/Restriction";
import type { CreateDescriptionRestrictions } from "./createDescription";

const createRestriction = (min: number, max: number): Restriction => ({ min, max });

interface CreateLandmarkRestrictions {
    title: Restriction;
    shortDescription: Restriction;
    description: CreateDescriptionRestrictions;
}

export default {
    title: createRestriction(3, 50),
    shortDescription: createRestriction(10, 150),
    description: createDescriptionRestrictions,
} as CreateLandmarkRestrictions;
