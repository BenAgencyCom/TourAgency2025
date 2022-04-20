import axios from "axios";
// Types
import type { FunctionComponent } from "react";
import LocalStorageUserData from "@/@types/LocalStorageUserData";
// Material UI Components
import Box from "@mui/material/Box";
// Material UI Icons
import LogoutIcon from "@mui/icons-material/Logout";
// Other components
import SingleRedirect from "../SingleRedirect";
// Redux
import { displaySnackbar } from "@/redux/slices/snackbar";
import { setUserData, setAuthentication } from "@/redux/slices/authentication";
import { useAppDispatch } from "@/hooks/useRedux";

interface LogoutProps {
    //
}

const Logout: FunctionComponent<LogoutProps> = (props) => {
    const dispatch = useAppDispatch();

    const logout = async () => {
        axios
            .delete("/api/auth/logout")
            .then(() => {
                dispatch(setAuthentication(false));
                dispatch(setUserData(null));
                dispatch(
                    displaySnackbar({
                        severity: "success",
                        msg: "You have logged out successfully!",
                    })
                );
            })
            .catch(() => {
                location.reload();
            });
    };

    return (
        <SingleRedirect onClick={logout}>
            <LogoutIcon></LogoutIcon>
            <span>Logout</span>
        </SingleRedirect>
    );
};

export default Logout;
