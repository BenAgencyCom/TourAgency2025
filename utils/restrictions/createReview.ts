import type { Restriction } from "@/@types/Restriction";

const createRestriction = (min: number, max: number): Restriction => ({ min, max });

export interface CreateReviewRestrictions {
    content: Restriction;
    singleTag: Restriction;
    tagsInGeneral: Restriction;
}
export default {
    content: createRestriction(10, 1024),
    singleTag: createRestriction(2, 30),
    tagsInGeneral: createRestriction(1, 5),
} as CreateReviewRestrictions;
