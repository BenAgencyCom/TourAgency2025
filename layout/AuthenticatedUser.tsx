import axios from "axios";
import Router from "next/router";
// Types
import type { FunctionComponent } from "react";
import type { UserData } from "@/redux/slices/authentication";
// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// Material UI Icons
import Logout from "@mui/icons-material/Logout";
// Redux
import { displaySnackbar } from "@/redux/slices/snackbar";
import { setUserData, setAuthentication } from "@/redux/slices/authentication";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

const AuthenticatedUser: FunctionComponent<{ buttonStyles: Record<string, unknown> }> = ({ buttonStyles }) => {
    const userData = useAppSelector((state) => state.authentication.userData) as UserData;
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
        <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
            <Box sx={{ position: "relative" }}>
                {(() => {
                    if (userData.avatar)
                        return (
                            <Avatar
                                src={`/upload/avatars/${userData.avatar}/thumbnail.jpg`} //
                                sx={{ width: "40px", height: "40px" }}
                            ></Avatar>
                        );
                    else return <Avatar sx={{ width: "40px", height: "40px", bgcolor: "primary.main" }}>K</Avatar>;
                })()}
                <Box
                    sx={{
                        position: "absolute",
                        right: "1px",
                        bottom: "1px",
                        bgcolor: "success.main",
                        borderRadius: "50%",
                        width: "10px",
                        height: "10px",
                    }}
                ></Box>
            </Box>

            <Typography variant="h6" sx={{ cursor: "default", mx: 1 }}>
                <Typography component="span">Singed in as: </Typography>
                <Typography component="span" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    {`${userData.name} ${userData.surname}`}
                </Typography>
            </Typography>
            <Button variant="contained" sx={buttonStyles} tabIndex={-1} onClick={logout}>
                <Logout></Logout>
                Logout
            </Button>
        </Box>
    );
};

export default AuthenticatedUser;
