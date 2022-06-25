// Tools
import axios from "axios";
import { useEffect, useState } from "react";
import useRegisterContext from "../hooks/useRegisterContext";
// Types
import type { Stage, Field } from "@/components/register/@types";
import type { FunctionComponent, Dispatch, SetStateAction } from "react";
import type { UploadingResultStatus } from "@/components/_utils/UploadingResult";
// Other components
import UploadingResult from "@/components/_utils/UploadingResult";
// Redux
import { setAuthentication } from "@/redux/slices/authentication";
import { useAppDispatch } from "@/hooks/useRedux";

interface RegisterStage3Props {
    setStage: Dispatch<SetStateAction<Stage>>;
}

const RegisterStage3: FunctionComponent<RegisterStage3Props> = (props) => {
    const dispatch = useAppDispatch();
    const context = useRegisterContext();
    const [status, setStatus] = useState<UploadingResultStatus>("pending");
    const [errorHTTTPCode, setErrorHTTTPCode] = useState<number>(200);

    useEffect(() => {
        const body = new FormData();
        // Load regular form fields
        (["name", "surname", "gender", "birth", "password", "passwordRepeatation", "email"] as Field[]).forEach((key) => body.append(key, (context as any)[key].value));
        body.append("country", JSON.stringify(context.country.value));
        // Load avatar image
        if (context.avatar.value instanceof File) body.append("avatar", context.avatar.value);

        axios
            .post("./api/auth/register", body, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then(() => {
                dispatch(setAuthentication(null));
                setStatus("success");
            })
            .catch((e) => {
                setStatus("error");
                setErrorHTTTPCode(e.response.status);
            });
        // Set authentication to null and force layout to tackle the rest
    }, [context, dispatch]);

    return (
        <UploadingResult
            status={status} //
            successMsg="Your account has been created"
            errorMsg="Something went wrong while proccessing your request"
            redirectURLAfterSuccess="/"
            errorHTTPStatusCode={errorHTTTPCode}
            actionsAfterError={[
                {
                    name: "Return",
                    onClick: () => props.setStage("PERSONAL_DATA"),
                },
                {
                    name: "Main page",
                    url: "/",
                },
            ]}
        />
    );
};

export default RegisterStage3;
