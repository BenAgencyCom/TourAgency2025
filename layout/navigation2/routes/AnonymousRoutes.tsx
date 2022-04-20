// Types
import type { FunctionComponent } from "react";
// Other components
import SingleRedirect from "./SingleRedirect";
// Material UI Icons
import Login from "@mui/icons-material/Login";
const GeneralRoutes: FunctionComponent = () => {
    return (
        <>
            <SingleRedirect url="/login">Login</SingleRedirect> {/*  */}
            <SingleRedirect url="/register">
                <Login></Login>
                <span>Register</span>
            </SingleRedirect>
        </>
    );
};

export default GeneralRoutes;
