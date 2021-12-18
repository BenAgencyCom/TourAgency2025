import type { FunctionComponent } from "react";
import type { CountryType } from "@/data/countries";
import type { StatedDataField } from "@/@types/StagedDataField";
import { useState, useEffect } from "react";
import joi from "joi";
// My components
import TextInput from "@/components/register/_formFields/TextInput";
import Select from "@/components/register/_formFields/Select";
import DataPicker from "@/components/register/_formFields/DataPicker";
import AutocompleteCountry from "@/components/register/_formFields/AutocompleteCountry";
import StepHeader from "@/components/register/stepper/StepHeader";
import StepNavigaton from "@/components/register/stepper/StepNavagation";
// Material UI components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Material UI icons
import AccountCircle from "@mui/icons-material/AccountCircle";

import styles from "@/sass/pages/register.module.sass";

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
    buttonStyles: Record<string, any>;
}

const PersonalDataAndCredentials: FunctionComponent<PersonalDataAndCredentialsProps> = (props) => {
    const { buttonStyles } = props;
    const { name, surname, country, gender, born } = props;
    //
    // Validation
    //
    const [blockContinue, setBlockContinue] = useState<boolean>(true);
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
        setBlockContinue(Boolean(error));
    };
    useEffect(test, [name, surname, country, gender, born, joiScheme]);
    //
    //
    //
    return (
        <Fade in={true}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                <StepHeader
                    header="User Data" //
                    icon={<AccountCircle className={styles.icon}></AccountCircle>}
                ></StepHeader>

                <Box className={styles["content-wrapper"]}>
                    <TextInput
                        label="Name" //
                        value={props.name.value}
                        updateValue={props.name.setValue}
                        buttonStyles={buttonStyles}
                    ></TextInput>
                    <TextInput
                        label="Surame" //
                        value={props.surname.value}
                        updateValue={props.surname.setValue}
                        buttonStyles={buttonStyles}
                    ></TextInput>
                    <AutocompleteCountry
                        label="Country" //
                        value={props.country.value}
                        updateValue={props.country.setValue}
                        buttonStyles={buttonStyles}
                    ></AutocompleteCountry>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <DataPicker
                            label="Born" //
                            value={props.born.value}
                            updateValue={props.born.setValue}
                            buttonStyles={buttonStyles}
                            sx={{ width: "59%" }}
                        ></DataPicker>
                        <Select
                            label="Gender" //
                            value={props.gender.value}
                            options={["MALE", "FEMALE", "OTHER"]}
                            updateValue={(val) => props.gender.setValue(val as "MALE" | "FEMALE" | "OTHER")}
                            buttonStyles={buttonStyles}
                            sx={{ width: "38%" }}
                        ></Select>
                    </Box>
                </Box>

                <StepNavigaton
                    currentSlideIndex={props.currentSlideIndex} //
                    updateSlideIndex={props.updateSlideIndex}
                    blockContinue={blockContinue}
                ></StepNavigaton>
            </Box>
        </Fade>
    );
};

export default PersonalDataAndCredentials;
