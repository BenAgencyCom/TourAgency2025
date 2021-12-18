import type { FunctionComponent, ReactNode } from "react";
import { useEffect, useState } from "react";
// Components
import Navigation from "./Navigation";
import PageLogo from "./PageLogo";
import LoginAndRegister from "./LoginAndRegister";
import Snackbar from "./Snackbar";
import AuthenticatedUser from "./AuthenticatedUser";
// Material UI Components
import Box from "@mui/material/Box";
import { AppBar, Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
// Tools
import styles from "@/sass/layout.module.sass";
import { useRouter } from "next/router";
import { authenticateToken, getUserData } from "@/utils/client/authenticate";
// Redux
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setAuthentication, getUserFromLocalStorage, setUserData } from "@/redux/slices/authentication";
import { resize } from "@/redux/slices/windowSizes";

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const extraStyles = { backgroundColor: "transparent !important", backgroundImage: "none !important", backdropFilter: "none !important", boxShadow: "none !important" };
    const [displayExtraStyles, setDisplayExtraStyles] = useState<boolean>(false);
    const [displayAppBar, setDisplayAppBar] = useState<boolean>(true);
    const buttonStyles = { px: 3, mx: 1 };

    const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
    const userData = useAppSelector((state) => state.authentication.userData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (router.pathname === "/") {
            setDisplayExtraStyles(true);
            window.addEventListener("scroll", () => {
                if (window.scrollY < 100) setDisplayExtraStyles(true);
                else setDisplayExtraStyles(false);
            });
        } else setDisplayExtraStyles(false);
        //
        // Toogle visibility
        //
        const routesWithDisabledMenu = ["/register", "/login"];
        if (routesWithDisabledMenu.includes(router.pathname)) setDisplayAppBar(false);
        else {
            setDisplayAppBar(true);
        }
        //
        // Authenticate user
        //
        (async () => {
            if (isAuthenticated === null) {
                const authenticationResult = (await authenticateToken()) as boolean;
                dispatch(setAuthentication(authenticationResult));
                // Load user's data
                if (authenticationResult) {
                    if (localStorage.getItem("userData")) {
                        dispatch(getUserFromLocalStorage());
                    } else {
                        dispatch(setUserData(await getUserData()));
                    }
                }
            }
        })();
        //
        // Track resize
        //
        dispatch(resize());
        window.addEventListener("resize", () => dispatch(resize()));
    }, [router.pathname, isAuthenticated, dispatch]);

    //
    return (
        <>
            <Fade in={displayAppBar && isAuthenticated !== null} timeout={300}>
                <AppBar className={styles.wrapper} sx={displayExtraStyles ? extraStyles : {}}>
                    <Container
                        maxWidth="xl"
                        sx={{
                            display: "flex", //
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 1,
                        }}
                    >
                        <PageLogo></PageLogo>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Navigation buttonStyles={buttonStyles}></Navigation>
                            <Divider orientation="vertical" flexItem />
                            {(() => {
                                if (isAuthenticated && userData) return <AuthenticatedUser buttonStyles={buttonStyles}></AuthenticatedUser>;
                                else return <LoginAndRegister buttonStyles={buttonStyles}></LoginAndRegister>;
                            })()}
                        </Box>
                    </Container>
                </AppBar>
            </Fade>
            {/*  */}
            <Box sx={{ backgroundColor: "background.paper" }}>
                <main>{children}</main>
                <Snackbar></Snackbar>
            </Box>
        </>
    );
};

export default Layout;
