// Tools
import { useState, useEffect } from "react";
import { alpha } from "@mui/system";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
// MAterial UI Icons
import MenuIcon from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
// Other components
import Link from "next/link";
// My Components
const LoginAndRegister = dynamic(() => import("./LoginAndRegister"));
const AuthenticatedUser = dynamic(() => import("./AuthenticatedUser"));
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styles
import styles from "@/sass/layout.module.sass";

const Navigation: FunctionComponent<{ buttonStyles: Record<string, unknown> }> = ({ buttonStyles }) => {
    const router = useRouter();
    const [displayMenu, setDisplayMenu] = useState<boolean>(false);
    const [renderComponent, setRenderComponent] = useState<boolean>(true);
    // Redux
    const { isAuthenticated, userData } = useAppSelector((state) => state.authentication);
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
                                        <Link href="/destinations" passHref>
                                            Cities
                                        </Link>
                                    </Button>
                                    <Button sx={buttonStyles} variant="outlined">
                                        <Link href="/landmarks" passHref>
                                            Sights
                                        </Link>
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
                                <Box className={styles["routes-wrapper"]} sx={{ p: 1, mr: 2 }}>
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
