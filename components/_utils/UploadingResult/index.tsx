// Tools
import dynamic from "next/dynamic";
// Types
import type { FunctionComponent } from "react";
// Other components
const Error = dynamic(() => import("./Error"));
const Pending = dynamic(() => import("./Pending"));
const Success = dynamic(() => import("./Success"));
// Styled components
import MainWrapper from "./styled_components/MainWrapper";

export type UploadingResultStatus = "success" | "pending" | "error";

export type ActionAfterError =
    | {
          /** Label which will be displayed as button content */
          name: string;
          /** Callback called after click */
          onClick: () => any;
      }
    | {
          /** Label which will be displayed as button content */
          name: string;
          /** Redirect to certain route */
          url: string;
      };

interface UploadingResultProps {
    status: UploadingResultStatus;
    successMsg: string;
    errorMsg: string;
    redirectURLAfterSuccess: string;
    errorHTTPStatusCode?: number;
    actionsAfterError: ActionAfterError[];
}

const UploadingResult: FunctionComponent<UploadingResultProps> = (props) => {
    const { status, successMsg, errorMsg, redirectURLAfterSuccess, errorHTTPStatusCode, actionsAfterError } = props;

    return (
        <MainWrapper>
            {(() => {
                switch (status) {
                    case "pending":
                        return <Pending />;
                    case "success":
                        return (
                            <Success
                                msg={successMsg} //
                                redirectURL={redirectURLAfterSuccess}
                            />
                        );
                    case "error":
                        return (
                            <Error
                                msg={errorMsg} //
                                errorHTTPStatusCode={errorHTTPStatusCode}
                                actions={actionsAfterError}
                            />
                        );
                }
            })()}
        </MainWrapper>
    );
};

export default UploadingResult;
