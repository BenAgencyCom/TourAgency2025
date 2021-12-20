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
    const height = useAppSelector((state) => state.windowSizes.height);

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

    const avatarSize = useMemo<number>((): number => {
        if (width > 1000) return 40;

        if (height > 750) return 250;
        else if (height > 650) return 200;
        else if (height > 630) return 150;
        return 130;
    }, [width, height]);

    const imageSize = useMemo<"small" | "medium" | "thumbnail">((): "small" | "medium" | "thumbnail" => {
        if (width > 1000) return "thumbnail";
        else if (height > 750) return "medium";
        else return "small";
    }, [width, height]);

    const greenBadgeSize = useMemo<number>((): number => {
        if (width > 1000) return 10;

        if (height > 750) return 30;
        else if (height > 700) return 25;
        return 20;
    }, [width, height]);

    const fontSize = useMemo<number>((): number => {
        if (width > 1000) return 1;
        return 1.3;
    }, [width]);

    return (
        <>
            <Box sx={{ position: "relative" }}>
                {(() => {
                    if (userData.avatar)
                        return (
                            <Avatar
                                src={`/upload/avatars/${userData.avatar}/${imageSize}.jpg`} //
                                sx={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}
                            ></Avatar>
                        );
                    else return <Avatar sx={{ width: `${avatarSize}px`, height: `${avatarSize}px`, bgcolor: "primary.main" }}>K</Avatar>;
                })()}
                <Box
                    sx={{
                        position: "absolute",
                        right: `${greenBadgeSize / 2}px`,
                        bottom: `${greenBadgeSize / 2}px`,
                        bgcolor: "success.main",
                        borderRadius: "50%",
                        width: `${greenBadgeSize}px`,
                        height: `${greenBadgeSize}px`,
                    }}
                ></Box>
            </Box>

            <Typography variant="h6" sx={{ cursor: "default", mx: 1, fontSize: `${fontSize}rem` }}>
                <Typography component="span" sx={{ fontSize: "inherit" }}>
                    Signed in as:{" "}
                </Typography>
                <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "bold", color: "primary.main" }}>
                    {`${userData.name} ${userData.surname}`}
                </Typography>
            </Typography>
            <Button variant="contained" sx={buttonStyles} tabIndex={-1} onClick={logout}>
                <Logout></Logout>
                Logout
            </Button>
        </>
    );
};

export default AuthenticatedUser;
