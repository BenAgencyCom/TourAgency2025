import type { Restriction } from "@/@types/Restriction";

const createRestriction = (min: number, max: number): Restriction => ({ min, max });

export interface CreateDescriptionRestrictions {
    header: Restriction;
    paragraph: Restriction;
    splittedParagraph: Restriction;
}

export default {
    header: createRestriction(3, 50),
    paragraph: createRestriction(10, 1024),
    splittedParagraph: createRestriction(10, 512),
} as CreateDescriptionRestrictions;
