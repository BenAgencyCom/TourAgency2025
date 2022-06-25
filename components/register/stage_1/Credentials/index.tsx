// Tools
import { useEffect } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import useEmailUniquenessValidator from "../hooks/useEmailUniquenessValidator";
import useRegisterContext from "@/components/register/hooks/useRegisterContext";
// Types
import type { FunctionComponent, Dispatch, SetStateAction } from "react";
// My components
import TextInput from "@/components/register/stage_1/_TextInput";
import PasswordInput from "@/components/register/stage_1/PersonalData/PasswordInput";

interface PersonalDataAndCredentialsProps {
    setDisableContinueButton: Dispatch<SetStateAction<boolean>>;
}

const PersonalDataAndCredentials: FunctionComponent<PersonalDataAndCredentialsProps> = (props) => {
    const { password, passwordRepeatation, email, checkWhetherAFieldIsInvalid } = useRegisterContext();

    const { checkEmailUniqueness, emailIsNotAvailable } = useEmailUniquenessValidator();
    const checkEmail = async () => await checkEmailUniqueness(email.value);

    useEffect(() => {
        if (emailIsNotAvailable) props.setDisableContinueButton(true);
    }, [emailIsNotAvailable, props]);

    return (
        <>
            <TextInput
                label="Email" //
                value={email.value}
                updateValue={email.setValue}
                onBlur={checkEmail}
                error={emailIsNotAvailable || checkWhetherAFieldIsInvalid("email")}
                _cypressTag="email"
            ></TextInput>
            <PasswordInput
                label="Password" //
                value={password.value}
                updateValue={password.setValue}
                _cypressTag="password"
                error={checkWhetherAFieldIsInvalid("password")}
            ></PasswordInput>
            <PasswordStrengthBar password={password.value} className="strength-bar" />
            <PasswordInput
                label="Repeat password" //
                value={passwordRepeatation.value}
                updateValue={passwordRepeatation.setValue}
                _cypressTag="repeat-password"
                error={checkWhetherAFieldIsInvalid("passwordRepeatation")}
            ></PasswordInput>
        </>
    );
};

export default PersonalDataAndCredentials;
