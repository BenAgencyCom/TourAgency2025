import type { Restriction } from "@/@types/Restriction";

const createRestriction = (min: number, max: number): Restriction => ({ min, max });

interface CREATE_LANDMARK_RESTRICTIONS_TYPE {
    title: Restriction;
    shortDescription: Restriction;
    description: {
        header: Restriction;
        paragraph: Restriction;
        splittedParagraph: Restriction;
    };
}

const CREATE_LANDMARK_RESTRICTIONS: CREATE_LANDMARK_RESTRICTIONS_TYPE = {
    title: createRestriction(3, 50),
    shortDescription: createRestriction(10, 150),
    description: {
        header: createRestriction(3, 50),
        paragraph: createRestriction(10, 1024),
        splittedParagraph: createRestriction(10, 512),
    },
};
export default CREATE_LANDMARK_RESTRICTIONS;
