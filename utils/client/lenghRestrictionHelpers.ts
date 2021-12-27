import type { Restriction } from "@/@types/Restriction";

export const lengthRestrictionMessage = (text: string, restrictions: Restriction, field: string = "field"): string => {
    const { length } = text;
    const { min, max } = restrictions;

    if (length > max) return `The ${field} must be up to ${max} characters long`;
    else if (length < min) return `The ${field} must be at least ${min} characters long`;
    else return `${length} / ${max}`;
};

export const validateLength = (text: string, restrictions: Restriction): boolean => {
    const { length } = text;
    const { min, max } = restrictions;

    return length > max || length < min;
};
