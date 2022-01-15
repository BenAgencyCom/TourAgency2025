import type { Restriction } from "@/@types/Restriction";
/**
 * - **If any occurred** return its explanation message with customisable filed name (prop `field`)
 * - Else return syntax alike: `text.length` / `restrictions.max`
 */
export const lengthRestrictionMessage = (text: string, restrictions: Restriction, field: string = "field"): string => {
    const { length } = text;
    const { min, max } = restrictions;

    if (length > max) return `The ${field} must be up to ${max} characters long`;
    else if (length < min) return `The ${field} must be at least ${min} characters long`;
    else return `${length} / ${max}`;
};

/**
 * Returns `true` if any error occurred
 */
export const validateLength = (text: number | string, restrictions: Restriction, isNumber: boolean = false): boolean => {
    const length = isNumber ? (text as number) : (text as string).length;
    const { min, max } = restrictions;

    return length > max || length < min;
};
