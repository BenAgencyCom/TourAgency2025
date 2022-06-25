// Types
import type { Gender } from "@prisma/client";
import type { CountryType } from "@/data/countries";
import type { StatedDataField } from "@/@types/StatedDataField";

export type Stage = "PERSONAL_DATA" | "CONFIRMATION" | "RESULT";

export type Field = "name" | "surname" | "gender" | "birth" | "country" | "password" | "passwordRepeatation" | "email";
export type CheckWhetherAFieldIsInvalid = (field: Field) => boolean;

export interface RegisterContextDataFields {
    name: StatedDataField<string>;
    email: StatedDataField<string>;
    gender: StatedDataField<Gender>;
    surname: StatedDataField<string>;
    avatar: StatedDataField<File | null>;
    password: StatedDataField<string>;
    birth: StatedDataField<Date | null>;
    country: StatedDataField<CountryType | null>;
    passwordRepeatation: StatedDataField<string>;
}
