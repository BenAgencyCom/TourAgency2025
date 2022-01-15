// Types
import type { FunctionComponent } from "react";
// Material UI Components
import CircularProgress from "@mui/material/CircularProgress";
// Other components
import StepHeader from "@/components/register/stepper/StepHeader";
// Material UI Icons
import Bolt from "@mui/icons-material/Bolt";

interface LoginHeaderInterface {
    pending: boolean;
}

const LoginHeader: FunctionComponent<LoginHeaderInterface> = (props) => {
    return (
        <>
            {(() => {
                if (props.pending) return <CircularProgress sx={{ position: "absolute", top: "20px", right: "20px" }}></CircularProgress>;
            })()}
            <StepHeader
                header="Login"
                icon={
                    <Bolt
                        sx={{
                            fontSize: "20rem",
                            ["@media (max-height:820px)"]: {
                                fontSize: "15rem",
                            },
                            ["@media (max-height:760px)"]: {
                                fontSize: "10rem",
                            },
                            ["@media (max-height:660px)"]: {
                                fontSize: "7rem",
                            },
                        }}
                    ></Bolt>
                }
            ></StepHeader>
        </>
    );
};

export default LoginHeader;
