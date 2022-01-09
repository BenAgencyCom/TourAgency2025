import type { Restriction } from "@/@types/Restriction";

const createRestriction = (min: number, max: number): Restriction => ({ min, max });

interface CREATE_DESTINATION_RESTRICTIONS_TYPE {
    city: Restriction;
    quickDescription: Restriction;
    landmark: {
        title: Restriction;
        description: Restriction;
        tag: Restriction;
    };
    description: {
        header: Restriction;
        paragraph: Restriction;
    };
}

const CREATE_DESTINATION_RESTRICTIONS: CREATE_DESTINATION_RESTRICTIONS_TYPE = {
    city: createRestriction(3, 60),
    quickDescription: createRestriction(10, 150),
    landmark: {
        title: createRestriction(3, 50),
        description: createRestriction(10, 1024),
        tag: createRestriction(3, 25),
    },
    description: {
        header: createRestriction(3, 50),
        paragraph: createRestriction(10, 1024),
    },
};
export default CREATE_DESTINATION_RESTRICTIONS;
