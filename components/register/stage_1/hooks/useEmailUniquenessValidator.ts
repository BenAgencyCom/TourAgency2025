// Tools
import joi from "joi";
import axios from "axios";
import { useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
// Types
interface UseEmailUniquenessValidatorResult {
    checkEmailUniqueness: (emailToCheck: string) => Promise<void>;
    emailIsNotAvailable: boolean;
}

// Helpers
const isEmailValid = (email: string): boolean => {
    const { error } = joi.string().max(255).email({ tlds: false }).validate(email);
    return !Boolean(error);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (): UseEmailUniquenessValidatorResult => {
    const displaySnackbar = useSnackbar();
    const [latestCheckedEmail, setLatestCheckedEmail] = useState<string>("");
    const [emailIsNotAvailable, setEmailIsNotAvailable] = useState<boolean>(false);
    //
    const checkEmailUniqueness = async (emailToCheck: string) => {
        if (latestCheckedEmail === emailToCheck) return;
        setLatestCheckedEmail(emailToCheck);

        if (!isEmailValid(emailToCheck)) return;

        const markThatEmailIsNotAvailable = () => {
            setEmailIsNotAvailable(true);
            displaySnackbar({
                msg: "This email is not available",
                severity: "error",
                hideAfter: 3000,
            });
        };

        try {
            const { available } = (await axios.get(`./api/is_email_available/${emailToCheck}`)).data as { available: boolean };
            if (!available) {
                markThatEmailIsNotAvailable();
            } else {
                setEmailIsNotAvailable(false);
            }
        } catch (e: unknown) {
            markThatEmailIsNotAvailable();
        }
    };

    return {
        checkEmailUniqueness,
        emailIsNotAvailable,
    };
};
