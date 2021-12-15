import type { FunctionComponent, ReactNode } from "react";
import { useEffect, useState } from "react";
// Components
import { AppBar, Container } from "@mui/material";
import Navigation from "./navigation/Navigation";
import PageLogo from "./PageLogo";
import LoginAndRegister from "./LoginAndRegister";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
// Tools
import styles from "@/sass/layout.module.sass";
import { useRouter } from "next/router";

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const extraStyles = { backgroundColor: "transparent !important", backgroundImage: "none !important", backdropFilter: "none !important", boxShadow: "none !important" };
    const [displayExtraStyles, setDisplayExtraStyles] = useState<boolean>(false);
    const [displayAppBar, setDisplayAppBar] = useState<boolean>(true);
    const buttonStyles = { px: 3, mx: 1 };

    useEffect(() => {
        if (router.pathname === "/") {
            setDisplayExtraStyles(true);
            window.addEventListener("scroll", () => {
                if (window.scrollY < 100) setDisplayExtraStyles(true);
                else setDisplayExtraStyles(false);
            });
        } else setDisplayExtraStyles(false);
        // Toogle visibility
        const routesWithDisabledMenu = ["/register"];
        if (routesWithDisabledMenu.includes(router.pathname)) setDisplayAppBar(false);
        else {
            setDisplayAppBar(true);
        }
    }, [router.pathname]);

    //
    return (
        <>
            <Fade in={displayAppBar} timeout={300}>
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
                            <LoginAndRegister buttonStyles={buttonStyles}></LoginAndRegister>
                        </Box>
                    </Container>
                </AppBar>
            </Fade>
            {/*  */}
            <Box sx={{ backgroundColor: "background.paper" }}>
                <main>{children}</main>
            </Box>
        </>
    );
};

export default Layout;
