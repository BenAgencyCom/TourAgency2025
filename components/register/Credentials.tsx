import type { FunctionComponent } from "react";
import { useState, useEffect } from "react";
import joi from "joi";
import PasswordStrengthBar from "react-password-strength-bar";
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

interface StatedDataField<T> {
    value: T;
    setValue: (value: T) => void;
}
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
        console.log(error);
        setBlockContinue(Boolean(error));
    };
    useEffect(test, [password, passwordRepeatation, email, joiScheme]);
    //
    //
    //
    return (
        <Fade in={true}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <StepHeader
                    header="Credentials" //
                    icon={<Key sx={{ fontSize: "10rem" }}></Key>}
                ></StepHeader>

                <Box sx={{ display: "flex", flexDirection: "column", width: "400px" }}>
                    <TextInput
                        label="Email" //
                        value={email.value}
                        updateValue={email.setValue}
                        buttonStyles={buttonStyles}
                    ></TextInput>
                    <PasswordInput
                        label="Password" //
                        value={password.value}
                        updateValue={password.setValue}
                        buttonStyles={buttonStyles}
                    ></PasswordInput>
                    <PasswordStrengthBar password={password.value}></PasswordStrengthBar>
                    <PasswordInput
                        label="Repeat password" //
                        value={passwordRepeatation.value}
                        updateValue={passwordRepeatation.setValue}
                        buttonStyles={buttonStyles}
                    ></PasswordInput>
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
