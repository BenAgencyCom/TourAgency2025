import { FunctionComponent, useState } from "react";
// My components
import PasswordInput from "@/components/register/personal_data_and_credentials/PasswordInput";
import TextInput from "@/components/register/personal_data_and_credentials/TextInput";
import Select from "@/components/register/personal_data_and_credentials/Select";
import PersonalDataAndCredentials from "@/components/register/PersonalDataAndCredentials";
import Stepper from "@/components/register/Stepper";
// Material UI components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from "@/sass/mixins.module.sass";

const Registration: FunctionComponent<{}> = () => {
    // Form Data
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [sex, setSex] = useState<"Male" | "Female" | "Other">("Male");
    const [born, setBorn] = useState<Date | null>(null);
    const [password, setPassword] = useState<string>("");
    const [passwordRepeatation, setPasswordRepeatation] = useState<string>("");
    // Auxiliary
    const buttonStyles = { my: 1, width: "400px" };
    //
    return (
        <Box className={styles.absoluteCenter} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Stepper></Stepper>

            <PersonalDataAndCredentials
                // Data
                name={{ value: name, setValue: setName }} //
                surname={{ value: surname, setValue: setSurname }} //
                email={{ value: email, setValue: setEmail }} //
                sex={{ value: sex, setValue: setSex }} //
                born={{ value: born, setValue: setBorn }} //
                password={{ value: password, setValue: setPassword }} //
                passwordRepeatation={{ value: passwordRepeatation, setValue: setPasswordRepeatation }} //
                //
                buttonStyles={buttonStyles}
            ></PersonalDataAndCredentials>

            <Button variant="contained" sx={{ mt: 5 }}>
                Continue
            </Button>
        </Box>
    );
};

export default Registration;
