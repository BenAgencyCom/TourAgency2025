// Tools
import joi from "joi";
import { useEffect } from "react";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { CountryType } from "@/data/countries";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { CheckWhetherAFieldIsInvalid } from "@/components/register/stage_1/hooks/useFormFieldsWithValidation";
// Other components
import TextInput from "@/components/register/stage_1/_TextInput";
import Select from "@/components/register/stage_1/PersonalData/Select";
import DataPicker from "@/components/register/stage_1/PersonalData/DataPicker";
import AutocompleteCountry from "@/components/register/stage_1/PersonalData/AutocompleteCountry";
// Other components
const FormFieldsWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    "&>.MuiFormControl-root": {
        width: "calc(50% - 5px) !important",
    },
    ["@media (max-width:600px)"]: {
        flexDirection: "column",
        "&>.MuiFormControl-root": {
            width: "100% !important",
        },
    },
}));

interface PersonalDataAndCredentialsProps {
    name: StatedDataField<string>;
    surname: StatedDataField<string>;
    country: StatedDataField<CountryType | null>;
    gender: StatedDataField<"MALE" | "FEMALE" | "OTHER">;
    born: StatedDataField<Date | null>;
    checkWhetherAFieldIsInvalid: CheckWhetherAFieldIsInvalid;
}

const PersonalDataAndCredentials: FunctionComponent<PersonalDataAndCredentialsProps> = (props) => {
    const { name, surname, country, gender, born, checkWhetherAFieldIsInvalid } = props;

    return (
        <>
            <TextInput
                label="Name" //
                value={name.value}
                updateValue={name.setValue}
                _cypressTag="name"
                error={checkWhetherAFieldIsInvalid("name")}
            ></TextInput>
            <TextInput
                label="Surame" //
                value={surname.value}
                updateValue={surname.setValue}
                _cypressTag="surname"
                error={checkWhetherAFieldIsInvalid("surname")}
            ></TextInput>
            <AutocompleteCountry
                label="Country" //
                value={country.value}
                updateValue={country.setValue}
                _cypressTag="country"
                sx={{ width: "100%" }}
                error={checkWhetherAFieldIsInvalid("country")}
            ></AutocompleteCountry>

            <FormFieldsWrapper className="form-fields-wrapper">
                <DataPicker
                    label="Born" //
                    value={born.value}
                    updateValue={born.setValue}
                    _cypressTag="born"
                ></DataPicker>
                <Select
                    label="Gender" //
                    value={gender.value}
                    options={["MALE", "FEMALE", "OTHER"]}
                    updateValue={(val) => gender.setValue(val as "MALE" | "FEMALE" | "OTHER")}
                    _cypressTag="gender"
                    error={checkWhetherAFieldIsInvalid("gender")}
                ></Select>
            </FormFieldsWrapper>
        </>
    );
};

export default PersonalDataAndCredentials;
