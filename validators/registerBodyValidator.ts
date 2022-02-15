import joi from "joi";
import validator from "@/validators/_validator";
import { PrismaClient } from "@prisma/client";
import type { BetterJoiError } from "@/utils/api/betterJoiErrors";

import type { ValidationResult } from "@/validators/_validator";
import type { RegisterBody } from "@/@types/router/auth/register";

const validate = async (data: RegisterBody): Promise<ValidationResult> => {
    const schema = joi.object({
        name: joi.string().min(3).max(30).trim(),
        surname: joi.string().min(3).max(40).trim(),
        gender: joi.valid("MALE", "FEMALE", "OTHER"),
        birth: joi.date(),
        country: joi.object({
            code: joi.string().length(2),
            label: joi.string().max(60),
            phone: joi.string().max(10),
        }),
        password: joi.string().min(6).max(255).trim(),
        passwordRepeatation: joi.string().valid(joi.ref("password")),
        email: joi.string().max(255).email({ tlds: false }),
    });
    const dataToValidate = JSON.parse(JSON.stringify(data));
    dataToValidate.country = JSON.parse(dataToValidate.country);
    dataToValidate.birth = new Date(dataToValidate.birth);

    const bodyValidationResult = validator(schema, dataToValidate);
    if (bodyValidationResult !== true) return bodyValidationResult;
    // Ensure that email is unique
    const prisma = new PrismaClient();
    if (await prisma.user.findUnique({ where: { email: data.email } }))
        return [
            {
                element: "email",
                type: "unique",
                message: "This email is already taken, try another one",
            },
        ] as BetterJoiError[];
    return true;
};

export default validate;
