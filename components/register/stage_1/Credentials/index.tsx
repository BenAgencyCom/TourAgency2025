// Tools
import joi from "joi";
import PasswordStrengthBar from "react-password-strength-bar";
import useEmailUniquenessValidator from "../hooks/useEmailUniquenessValidator";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// My components
import TextInput from "@/components/register/stage_1/_TextInput";
import PasswordInput from "@/components/register/stage_1/PersonalData/PasswordInput";

interface PersonalDataAndCredentialsProps {
    // Data
    password: StatedDataField<string>;
    passwordRepeatation: StatedDataField<string>;
    email: StatedDataField<string>;
    // Auxiliary stuff
    currentSlideIndex: number;
    updateSlideIndex: (x: number) => void;
}

const PersonalDataAndCredentials: FunctionComponent<PersonalDataAndCredentialsProps> = (props) => {
    const { password, passwordRepeatation, email } = props;
    const { checkEmailUniqueness, emailIsNotAvailable } = useEmailUniquenessValidator();
    //
    // Validation
    //
    const joiScheme = joi.object({
        password: joi.string().min(6).max(255).trim(),
        passwordRepeatation: joi.string().valid(joi.ref("password")),
        email: joi.string().max(255).email({ tlds: false }),
    });

    const checkEmail = async () => await checkEmailUniqueness(email.value);

    //
    //
    //
    return (
        <>
            <TextInput
                label="Email" //
                value={email.value}
                updateValue={email.setValue}
                onBlur={checkEmail}
                error={emailIsNotAvailable}
                _cypressTag="email"
            ></TextInput>
            <PasswordInput
                label="Password" //
                value={password.value}
                updateValue={password.setValue}
                _cypressTag="password"
            ></PasswordInput>
            <PasswordStrengthBar password={password.value} className="strength-bar" />
            <PasswordInput
                label="Repeat password" //
                value={passwordRepeatation.value}
                updateValue={passwordRepeatation.setValue}
                _cypressTag="repeat-password"
            ></PasswordInput>
        </>
    );
};

export default PersonalDataAndCredentials;
