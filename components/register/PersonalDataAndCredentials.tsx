import type { FunctionComponent } from "react";
// My components
import PasswordInput from "@/components/register/personal_data_and_credentials/PasswordInput";
import TextInput from "@/components/register/personal_data_and_credentials/TextInput";
import Select from "@/components/register/personal_data_and_credentials/Select";
import DataPicker from "@/components/register/personal_data_and_credentials/DataPicker";
// Material UI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from "@/sass/mixins.module.sass";

interface StatedDataField<T> {
    value: T;
    setValue: (value: T) => void;
}
interface PersonalDataAndCredentialsProps {
    // Data
    name: StatedDataField<string>;
    surname: StatedDataField<string>;
    email: StatedDataField<string>;
    sex: StatedDataField<"Male" | "Female" | "Other">;
    born: StatedDataField<Date | null>;
    password: StatedDataField<string>;
    passwordRepeatation: StatedDataField<string>;
    // Auxiliary stuff
    buttonStyles: Record<string, any>;
}

const PersonalDataAndCredentials: FunctionComponent<PersonalDataAndCredentialsProps> = (props) => {
    const { buttonStyles } = props;
    return (
        <Box sx={{ backgroundColor: "background.default", display: "flex", flexDirection: "column" }}>
            <Typography
                variant="h1" //
                className={styles.unselectable}
                sx={{ color: "text.primary", fontWeight: "bold", mb: 3, textAlign: "center" }}
            >
                Register
            </Typography>
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
            <TextInput
                label="Email" //
                value={props.email.value}
                updateValue={props.email.setValue}
                buttonStyles={buttonStyles}
            ></TextInput>
            <Select
                label="Sex" //
                value={props.sex.value}
                options={["Male", "Female", "Other"]}
                updateValue={(val) => props.sex.setValue(val as "Male" | "Female" | "Other")}
                buttonStyles={buttonStyles}
            ></Select>
            <DataPicker
                label="Born" //
                value={props.born.value}
                updateValue={props.born.setValue}
            ></DataPicker>
            <PasswordInput
                label="Password" //
                value={props.password.value}
                updateValue={props.password.setValue}
                buttonStyles={buttonStyles}
            ></PasswordInput>
            <PasswordInput
                label="Repeat password" //
                value={props.passwordRepeatation.value}
                updateValue={props.passwordRepeatation.setValue}
                buttonStyles={buttonStyles}
            ></PasswordInput>
        </Box>
    );
};

export default PersonalDataAndCredentials;
