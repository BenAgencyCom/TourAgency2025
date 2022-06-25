// Tools
import joi from "joi";
import stated from "@/utils/client/stated";
import { useEffect, useState, useMemo } from "react";
// Types
import type { Gender } from "@prisma/client";
import type { CountryType } from "@/data/countries";
import type { CheckWhetherAFieldIsInvalid, RegisterContextDataFields, Field } from "@/components/register/@types";

interface UseFormFieldsWithValidationResult {
    checkWhetherAFieldIsInvalid: CheckWhetherAFieldIsInvalid;
    allFieldsAreValid: boolean;
    data: RegisterContextDataFields;
}

const joiScheme = joi.object({
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

// eslint-disable-next-line import/no-anonymous-default-export
export default (): UseFormFieldsWithValidationResult => {
    const [invalidFields, setInvalidFields] = useState<Field[]>([]);
    // Data
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [country, setCountry] = useState<CountryType | null>(null);
    const [gender, setGender] = useState<Gender>("MALE");
    const [birth, setBorn] = useState<Date | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [password, setPassword] = useState<string>("");
    const [passwordRepeatation, setPasswordRepeatation] = useState<string>("");

    const allFieldsAreValid = useMemo<boolean>(() => {
        return invalidFields.length === 0;
    }, [invalidFields]);
    const checkWhetherAFieldIsInvalid = (field: Field): boolean => invalidFields.includes(field);

    useEffect(() => {
        const { error } = joiScheme.validate({ name, surname, email, country, gender, birth, password, passwordRepeatation }, { abortEarly: false });

        if (error) {
            const errors: Field[] = [];
            // Extract all properties names from joi's error
            error.details.forEach(({ message }) => {
                const field = message.split('"')[1];
                if (field) errors.push(field as Field);
            });
            setInvalidFields(errors);
        } else {
            setInvalidFields([]);
        }
    }, [name, surname, email, country, gender, birth, password, passwordRepeatation]);
    //
    return {
        checkWhetherAFieldIsInvalid,
        allFieldsAreValid,
        data: {
            birth: stated(birth, setBorn),
            country: stated(country, setCountry),
            email: stated(email, setEmail),
            gender: stated(gender, setGender),
            avatar: stated(avatar, setAvatar),
            name: stated(name, setName),
            password: stated(password, setPassword),
            passwordRepeatation: stated(passwordRepeatation, setPasswordRepeatation),
            surname: stated(surname, setSurname),
        },
    };
};
