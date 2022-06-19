// Tools
import joi from "joi";
import { useEffect } from "react";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { CountryType } from "@/data/countries";
import type { StatedDataField } from "@/@types/StatedDataField";
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
    // Data
    name: StatedDataField<string>;
    surname: StatedDataField<string>;
    country: StatedDataField<CountryType | null>;
    gender: StatedDataField<"MALE" | "FEMALE" | "OTHER">;
    born: StatedDataField<Date | null>;
    // Auxiliary stuff
    currentSlideIndex: number;
    updateSlideIndex: (x: number) => void;
}

const PersonalDataAndCredentials: FunctionComponent<PersonalDataAndCredentialsProps> = (props) => {
    const { name, surname, country, gender, born } = props;
    //
    // Validation
    //
    const joiScheme = joi.object({
        name: joi.string().min(3).max(30).trim(),
        surname: joi.string().min(3).max(40).trim(),
        gender: joi.valid("MALE", "FEMALE", "OTHER"),
        born: joi.date(),
        country: joi.object({
            code: joi.string().length(2),
            label: joi.string().max(60),
            phone: joi.string().max(10),
        }),
    });
    const test = () => {
        const { error } = joiScheme.validate({
            name: name.value,
            surname: surname.value,
            country: country.value,
            gender: gender.value,
            born: born.value,
        });
        // setBlockContinue(Boolean(error));
    };
    useEffect(test, [name, surname, country, gender, born, joiScheme]);
    //
    //
    //
    return (
        <>
            <TextInput
                label="Name" //
                value={props.name.value}
                updateValue={props.name.setValue}
                _cypressTag="name"
            ></TextInput>
            <TextInput
                label="Surame" //
                value={props.surname.value}
                updateValue={props.surname.setValue}
                _cypressTag="surname"
            ></TextInput>
            <AutocompleteCountry
                label="Country" //
                value={props.country.value}
                updateValue={props.country.setValue}
                _cypressTag="country"
                sx={{ width: "100%" }}
            ></AutocompleteCountry>

            <FormFieldsWrapper className="form-fields-wrapper">
                <DataPicker
                    label="Born" //
                    value={props.born.value}
                    updateValue={props.born.setValue}
                    _cypressTag="born"
                ></DataPicker>
                <Select
                    label="Gender" //
                    value={props.gender.value}
                    options={["MALE", "FEMALE", "OTHER"]}
                    updateValue={(val) => props.gender.setValue(val as "MALE" | "FEMALE" | "OTHER")}
                    _cypressTag="gender"
                ></Select>
            </FormFieldsWrapper>
        </>
    );
};

export default PersonalDataAndCredentials;
