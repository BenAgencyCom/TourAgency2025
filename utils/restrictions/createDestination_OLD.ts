import type { Restriction } from "@/@types/Restriction";

const createRestriction = (min: number, max: number): Restriction => ({ min, max });

interface CREATE_DESTINATION_RESTRICTIONS_TYPE {
    city: Restriction;
    population: Restriction;
    quickDescription: Restriction;
    landmark: {
        title: Restriction;
        description: Restriction;
        tag: Restriction;
    };
    description: {
        header: Restriction;
        paragraph: Restriction;
        splittedParagraph: Restriction;
    };
}

const CREATE_DESTINATION_RESTRICTIONS: CREATE_DESTINATION_RESTRICTIONS_TYPE = {
    city: createRestriction(3, 60),
    population: createRestriction(1, 10000000000),
    quickDescription: createRestriction(10, 150),
    landmark: {
        title: createRestriction(3, 50),
        description: createRestriction(10, 1024),
        tag: createRestriction(3, 25),
    },
    description: {
        header: createRestriction(3, 50),
        paragraph: createRestriction(10, 1024),
        splittedParagraph: createRestriction(10, 512),
    },
};
export default CREATE_DESTINATION_RESTRICTIONS;
