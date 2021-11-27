import type { FunctionComponent, ReactNode } from "react";
// Components
import { AppBar, Container } from "@mui/material";
import Navigation from "./navigation/Navigation";
import PageLogo from "./PageLogo";
import LoginAndRegister from "./LoginAndRegister";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// Tools
import styles from "@/sass/layout.module.sass";

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <AppBar className={styles.wrapper}>
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
