import axios from "axios";
import { useMemo } from "react";
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
    const width = useAppSelector((state) => state.windowSizes.width);

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
        <>
            {(() => {
                if (width > 1000) {
                    return (
                        <>
                            <Box sx={{ position: "relative" }}>
                                {(() => {
                                    if (userData.avatar)
                                        return (
                                            <Avatar
                                                src={`/upload/avatars/${userData.avatar}/thumbnail.jpg`} //
                                                sx={{ width: `40px`, height: `40px` }}
                                            ></Avatar>
                                        );
                                    else return <Avatar sx={{ width: `40px`, height: `40px`, bgcolor: "primary.main" }}>K</Avatar>;
                                })()}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        right: `0px`,
                                        bottom: `0px`,
                                        bgcolor: "success.main",
                                        borderRadius: "50%",
                                        width: `10px`,
                                        height: `10px`,
                                    }}
                                ></Box>
                            </Box>

                            <Typography variant="h6" sx={{ cursor: "default", mx: 1, fontSize: `1rem !important`, mt: width < 1000 ? 2 : 0 }}>
                                {(() => {
                                    if (width > 1200 || width <= 1000) {
                                        return (
                                            <Typography component="span" sx={{ fontSize: "inherit" }}>
                                                Signed in as:{" "}
                                            </Typography>
                                        );
                                    }
                                })()}
                                <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "bold", color: "primary.main" }}>
                                    {`${userData.name} ${userData.surname}`}
                                </Typography>
                            </Typography>
                        </>
                    );
                }
            })()}
            <Button variant="contained" sx={buttonStyles} tabIndex={-1} onClick={logout}>
                <Logout></Logout>
                Logout
            </Button>
        </>
    );
};

export default AuthenticatedUser;
