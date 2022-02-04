import type { FunctionComponent, ReactNode } from "react";
import { useEffect, useState } from "react";
// Components
import Navigation from "./Navigation";
import PageLogo from "./PageLogo";
import Snackbar from "./Snackbar";
// Material UI Components
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
// Tools
import styles from "@/sass/layout.module.sass";
import { useRouter } from "next/router";
import { authenticateToken, getUserData } from "@/utils/client/authenticate";
// Redux
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { setAuthentication, getUserFromLocalStorage, setUserData } from "@/redux/slices/authentication";
import { resize } from "@/redux/slices/windowSizes";

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const extraStyles = { backgroundColor: "transparent !important", backgroundImage: "none !important", backdropFilter: "none !important", boxShadow: "none !important" };
    const [displayExtraStyles, setDisplayExtraStyles] = useState<boolean>(false);
    const [displayAppBar, setDisplayAppBar] = useState<boolean>(true);
    const buttonStyles = { px: 3, mx: 1 };

    const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setDisplayExtraStyles(true);
        window.addEventListener("scroll", () => {
            if (window.scrollY < 100) setDisplayExtraStyles(true);
            else setDisplayExtraStyles(false);
        });
        //
        // Toogle visibility
        //
        const routesWithDisabledMenu = ["/register", "/login", "/admin/create_destination"];
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
                const setUserDataFromAPIRequest = async () => dispatch(setUserData(await getUserData()));
                if (authenticationResult) {
                    try {
                        dispatch(getUserFromLocalStorage());
                    } catch (e: unknown) {
                        await setUserDataFromAPIRequest();
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
                        <Navigation buttonStyles={buttonStyles}></Navigation>
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
