import type { FunctionComponent, ReactNode } from "react";
import { useEffect, useState } from "react";
// Components
import { AppBar, Container } from "@mui/material";
import Navigation from "./navigation/Navigation";
import PageLogo from "./PageLogo";
import LoginAndRegister from "./LoginAndRegister";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// Tools
import styles from "@/sass/layout.module.sass";
import { useRouter } from "next/router";

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const extraStyles = { backgroundColor: "transparent !important", backgroundImage: "none !important", backdropFilter: "none !important", boxShadow: "none !important" };
    const [displayExtraStyles, setDisplayExtraStyles] = useState<boolean>(false);

    useEffect(() => {
        if (router.pathname === "/") {
            setDisplayExtraStyles(true);
            window.addEventListener("scroll", () => {
                if (window.scrollY < 100) setDisplayExtraStyles(true);
                else setDisplayExtraStyles(false);
            });
        } else setDisplayExtraStyles(false);
    }, [router.pathname]);
    return (
        <>
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
                        <Navigation></Navigation>
                        <Divider orientation="vertical" flexItem />
                        <LoginAndRegister></LoginAndRegister>
                    </Box>
                </Container>
            </AppBar>
            {/*  */}
            <main>{children}</main>
        </>
    );
};

export default Layout;
