import { useState, useEffect } from "react";
import joi from "joi";
import PasswordStrengthBar from "react-password-strength-bar";
import axios from "axios";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
// My components
import TextInput from "@/components/register/_formFields/TextInput";
import PasswordInput from "@/components/register/_formFields/PasswordInput";
import StepHeader from "@/components/register/stepper/StepHeader";
import StepNavigaton from "@/components/register/stepper/StepNavagation";
// Material UI components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Material UI icons
import Key from "@mui/icons-material/Key";

import styles from "@/sass/pages/register.module.sass";

interface PersonalDataAndCredentialsProps {
    // Data
    password: StatedDataField<string>;
    passwordRepeatation: StatedDataField<string>;
    email: StatedDataField<string>;
    // Auxiliary stuff
    currentSlideIndex: number;
    updateSlideIndex: (x: number) => void;
    buttonStyles: Record<string, any>;
}

const PersonalDataAndCredentials: FunctionComponent<PersonalDataAndCredentialsProps> = (props) => {
    const { buttonStyles, password, passwordRepeatation, email } = props;
    const [emailAvailableness, setEmailAvailableness] = useState<boolean>(true);
    //
    // Validation
    //
    const [blockContinue, setBlockContinue] = useState<boolean>(true);
    const joiScheme = joi.object({
        password: joi.string().min(6).max(255).trim(),
        passwordRepeatation: joi.string().valid(joi.ref("password")),
        email: joi.string().max(255).email({ tlds: false }),
    });
    const test = () => {
        const { error } = joiScheme.validate({
            password: password.value,
            passwordRepeatation: passwordRepeatation.value,
            email: email.value,
        });
        setBlockContinue(Boolean(error));
    };
    const checkEmail = async () => {
        try {
            const { available } = (await axios.get(`./api/is_email_available/${email.value}`)).data as { available: boolean };
            setEmailAvailableness(Boolean(available));
        } catch (e: unknown) {
            setEmailAvailableness(false);
        }
    };
    useEffect(test, [password, passwordRepeatation, email, joiScheme]);
    useEffect(() => {
        // running this funcion w/o await was on purpose
        checkEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //
    //
    //
    return (
        <Fade in={true}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                <StepHeader
                    header="Credentials" //
                    icon={<Key className={styles.icon}></Key>}
                ></StepHeader>

                <Box className={styles["content-wrapper"]}>
                    <TextInput
                        label="Email" //
                        value={email.value}
                        updateValue={email.setValue}
                        onBlur={checkEmail}
                        errorMsg={emailAvailableness ? false : "Email address is not available"}
                        sx={{ mb: 2 }}
                        _cypressTag="email"
                    ></TextInput>
                    <PasswordInput
                        label="Password" //
                        value={password.value}
                        updateValue={password.setValue}
                        sx={{ mb: 2 }}
                        _cypressTag="password"
                    ></PasswordInput>
                    <PasswordStrengthBar password={password.value}></PasswordStrengthBar>
                    <PasswordInput
                        label="Repeat password" //
                        value={passwordRepeatation.value}
                        updateValue={passwordRepeatation.setValue}
                        _cypressTag="repeat-password"
                    ></PasswordInput>
                </Box>

                <StepNavigaton
                    currentSlideIndex={props.currentSlideIndex} //
                    updateSlideIndex={props.updateSlideIndex}
                    blockContinue={blockContinue || !emailAvailableness}
                ></StepNavigaton>
            </Box>
        </Fade>
    );
};

export default PersonalDataAndCredentials;
