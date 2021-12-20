import type { FunctionComponent } from "react";
import { useState, useEffect } from "react";
import { alpha } from "@mui/system";
import { useRouter } from "next/router";
// Material UI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
// MAterial UI Icons
import MenuIcon from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
// My Components
import LoginAndRegister from "./LoginAndRegister";
import AuthenticatedUser from "./AuthenticatedUser";
// Redux
import { useAppSelector } from "@/redux/hooks";
// Styles
import styles from "@/sass/layout.module.sass";

const Navigation: FunctionComponent<{ buttonStyles: Record<string, unknown> }> = ({ buttonStyles }) => {
    const router = useRouter();
    const [displayMenu, setDisplayMenu] = useState<boolean>(false);
    const [renderComponent, setRenderComponent] = useState<boolean>(true);
    // Redux
    const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
    const userData = useAppSelector((state) => state.authentication.userData);
    const width = useAppSelector((state) => state.windowSizes.width);

    const navigationWrapperStyles = () => {
        if (displayMenu && width <= 1000) {
            return {
                backgroundColor: alpha("#000", 0.5),
                backdropFilter: "blur(10px)",
            };
        }
    };

    useEffect(() => {
        if (width > 1000) {
            if (displayMenu) setDisplayMenu(false);
        } else {
            if (!displayMenu) setRenderComponent(false);
        }
    }, [displayMenu, width]);

    useEffect(() => {
        setDisplayMenu(false);
    }, [router.pathname]);

    useEffect(() => {
        if (displayMenu) setRenderComponent(true);
        else
            setTimeout(() => {
                setRenderComponent(false);
            });
    }, [displayMenu]);

    return (
        <>
            {(() => {
                if (width > 1000 || renderComponent)
                    return (
                        <Box className={styles["navigation-wrapper"]} sx={navigationWrapperStyles()}>
                            <Fade in={displayMenu || width > 1000}>
                                <Box className={styles["routes-wrapper"]} sx={{ p: 1, mr: 2 }}>
                                    <Button sx={buttonStyles} variant="outlined">
                                        Lorem
                                    </Button>
                                    <Button sx={buttonStyles} variant="outlined">
                                        Ipsum
                                    </Button>
                                    <Button sx={buttonStyles} variant="outlined">
                                        Gorzen
                                    </Button>
                                </Box>
                            </Fade>
                            {/*  */}
                            {(() => {
                                if (width > 1000) return <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />;
                            })()}
                            {/*  */}
                            <Fade in={displayMenu || width > 1000}>
                                <Box className={styles["routes-wrapper"]} sx={{ p: 1, mr: 2, order: width <= 1000 && isAuthenticated ? -1 : 1 }}>
                                    {(() => {
                                        if (isAuthenticated && userData) return <AuthenticatedUser buttonStyles={buttonStyles}></AuthenticatedUser>;
                                        else return <LoginAndRegister buttonStyles={buttonStyles}></LoginAndRegister>;
                                    })()}
                                </Box>
                            </Fade>
                        </Box>
                    );
            })()}
            {(() => {
                if (width <= 1000)
                    return (
                        <IconButton sx={{ position: "relative", p: 3 }} onClick={() => setDisplayMenu(!displayMenu)}>
                            <Fade in={!displayMenu}>
                                <MenuIcon className={styles.menuIcon}></MenuIcon>
                            </Fade>
                            <Fade in={displayMenu}>
                                <Close className={styles.menuIcon}></Close>
                            </Fade>
                        </IconButton>
                    );
            })()}
        </>
    );
};

export default Navigation;
