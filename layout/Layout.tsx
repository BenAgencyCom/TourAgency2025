// Tools
import { useRouter } from "next/router";
import { authenticateToken, getUserData } from "@/utils/client/authenticate";
import { useEffect, useState } from "react";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import Navigation from "./navigation";
import Snackbar from "./Snackbar";
import ScrollButton from "./ScrollButton";
import LayoutFooter from "./footer";
// Redux
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { resize, setScroll } from "@/redux/slices/windowSizes";
import { setAuthentication, getUserFromLocalStorage, setUserData } from "@/redux/slices/authentication";

interface LayoutProps {
    children: ReactNode;
    loading: boolean;
}

const Layout: FunctionComponent<LayoutProps> = (props) => {
    const router = useRouter();
    const [displayAppBar, setDisplayAppBar] = useState<boolean>(true);

    const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
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
            window.addEventListener("scroll", () => dispatch(setScroll()));
        }
        return () => {
            isMounted = false;
        };
    }, [router.pathname, isAuthenticated, dispatch]);

    //
    return (
        <>
            <Navigation></Navigation>
            {/*  */}
            <Box sx={{ backgroundColor: "background.lightPaper" }}>
                <main>{props.children}</main>
                <Snackbar></Snackbar>
            </Box>
            <ScrollButton></ScrollButton>

            {(() => {
                if (!props.loading && displayAppBar) {
                    return <LayoutFooter />;
                }
            })()}
        </>
    );
};

export default Layout;
