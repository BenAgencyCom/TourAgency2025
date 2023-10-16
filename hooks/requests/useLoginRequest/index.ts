// Tools
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import stated from "@/utils/client/stated";
import useSnackbar from "@/hooks/useSnackbar";
import useCredentialsValidator from "./useCredentialsValidator";
// Types
import type { StatedDataField } from "@/@types/StatedDataField";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { setAuthentication } from "@/redux/slices/authentication";

interface UseLoginRequestResult {
    email: StatedDataField<string>;
    password: StatedDataField<string>;
    requestIsPending: boolean;
    /** Fixed before sending a request. Perform a joi validation on data from a login form */
    credentialsAreValid: boolean;
    performRequest: () => Promise<void>;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (): UseLoginRequestResult => {
    const dispatch = useAppDispatch();
    const displaySnackbar = useSnackbar();
    const router = useRouter();

    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [requestIsPending, setRequestIsPending] = useState<boolean>(false);

    const credentialsAreValid = useCredentialsValidator({ email, password });

    const performRequest = async () => {
        if (!credentialsAreValid) return;
        setRequestIsPending(true);

        await axios
            .post("/api/auth/login", { email, password })
            .then(() => {
                displaySnackbar({
                    msg: "You have been successfully logged in!",
                    severity: "success",
                    hideAfter: 3000,
                });
                dispatch(setAuthentication(null));
                setTimeout(() => {
                    router.push("/");
                }, 100);
            })
            .catch((e) => {
                const { status } = e.toJSON();
                if (status === 401)
                    displaySnackbar({
                        msg: "Credentials do not match!",
                        severity: "error",
                        hideAfter: 3000,
                    });
                else if (status === 500) {
                    displaySnackbar({
                        msg: "Unknown error has occured!",
                        severity: "error",
                        hideAfter: 3000,
                    });
                }
                setRequestIsPending(false);
            });
    };

    return {
        email: stated(email, setEmail),
        password: stated(password, setPassword),
        requestIsPending,
        credentialsAreValid,
        //
        performRequest,
    };
};
