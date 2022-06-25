// Tools
// Types
import type { FunctionComponent } from "react";
// Other components
import UploadingResult from "@/components/_utils/UploadingResult";

interface RegisterStage3Props {
    //
}

const RegisterStage3: FunctionComponent<RegisterStage3Props> = (props) => {
    return (
        <UploadingResult
            status="error" //
            successMsg="Your account has been created"
            errorMsg="Something went wrong while proccessing your request"
            redirectURLAfterSuccess="/"
            errorHTTPStatusCode={409}
            actionsAfterError={[
                {
                    name: "Return",
                    onClick: () => alert("going back"),
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
