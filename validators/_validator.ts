import createBetterJoiErrors from "@/utils/api/betterJoiErrors";
import type { Schema } from "joi";
import type { BetterJoiError } from "@/utils/api/betterJoiErrors";

export type ValidationResult = true | BetterJoiError[];

const validatorBoilerplate = (schema: Schema, dataToValidate: Object): ValidationResult => {
    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) return createBetterJoiErrors(error);
    return true;
};

export default validatorBoilerplate;
