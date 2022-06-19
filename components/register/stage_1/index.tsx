// Tools
// Types
import type { FunctionComponent } from "react";
import type { CountryType } from "@/data/countries";
import type { StatedDataField } from "@/@types/StatedDataField";

interface RegisterStage1Props {
    name: StatedDataField<string>;
    surname: StatedDataField<string>;
    country: StatedDataField<CountryType | null>;
    gender: StatedDataField<"MALE" | "FEMALE" | "OTHER">;
    born: StatedDataField<Date | null>;
    password: StatedDataField<string>;
    passwordRepeatation: StatedDataField<string>;
    email: StatedDataField<string>;
    avatar: StatedDataField<File | null>;
}

const RegisterStage1: FunctionComponent<RegisterStage1Props> = (props) => {
    return (
        <>
            <span></span>
        </>
    );
};

export default RegisterStage1;
