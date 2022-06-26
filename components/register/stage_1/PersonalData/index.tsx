// Tools
import { styled } from "@mui/system";
import useRegisterContext from "@/components/register/hooks/useRegisterContext";
// Types
import type { FunctionComponent } from "react";
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

const PersonalDataAndCredentials: FunctionComponent = () => {
    const { name, surname, country, gender, birth, checkWhetherAFieldIsInvalid } = useRegisterContext();

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
                    value={birth.value}
                    updateValue={birth.setValue}
                    _cypressTag="birth"
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
