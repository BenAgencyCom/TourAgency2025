// Tools
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { isContrastReversed, isDisabled } from "./utils/distinguishExceptionality";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import GeneralRoutes from "./routes/GeneralRoutes";
import PageLogo from "./PageLogo";
import AnonymousRoutes from "./routes/AnonymousRoutes";
import AuthenticatedUserRoutes from "./routes/AuthenticatedUserRoutes";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";
import MobileMenuButton from "./styled/MobileMenuButton";
import NavigationWrapper from "./styled/NavigationWrapper";

const Navigation: FunctionComponent<MUIStyledCommonProps> = (props) => {
    const router = useRouter();
    // Redux
    const { scrollY, width } = useAppSelector((state) => state.windowSizes);
    const { isAuthenticated, userData } = useAppSelector((state) => state.authentication);
    // Handle scrolling
    const previousScrollY = useRef<number>(0);
    const [isScrollingDown, setIsScrollingDown] = useState<boolean>(true);

    useEffect(() => {
        if (previousScrollY.current === null) {
            previousScrollY.current = scrollY;
            return;
        }
        if (previousScrollY.current < scrollY && !isScrollingDown) setIsScrollingDown(true);
        else if (previousScrollY.current > scrollY && isScrollingDown) setIsScrollingDown(false);
        previousScrollY.current = scrollY;
    }, [scrollY, isScrollingDown]);

    const isScrolledDown = scrollY > 70;
    const applyReverseContrast = isContrastReversed(router.pathname);
    const navbarIsDisabled = isDisabled(router.pathname);

    // Mobile menu
    const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
    const [previeousScollTop, setPrevieousScollTop] = useState<number>(0);

    const unblockScrolling = () => {
        document.body.style.top = `0px`;
        document.body.style.paddingLeft = `0px`;
        document.body.style.position = "static";
        document.body.style.width = "auto";
    };

    const handleOpenMobileMenu = () => {
        if (!openMobileMenu) {
            setPrevieousScollTop(window.scrollY);
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.position = "fixed";
            document.body.style.width = "100vw";
            setOpenMobileMenu((val) => !val);
        } else {
            unblockScrolling();
            setTimeout(() => {
                window.scrollTo({ top: previeousScollTop });
                setIsScrollingDown(false);
                previousScrollY.current = previeousScollTop + 10;
                setOpenMobileMenu((val) => !val);
            }, 50);
        }
    };
    useEffect(() => {
        unblockScrolling();
        setTimeout(() => {
            setOpenMobileMenu(false);
        }, 1);
    }, [router.pathname]);

    // Prevent from blocking scrolling while switching to wider screen
    useEffect(() => {
        if (width > 1000 && openMobileMenu) {
            unblockScrolling();
            setTimeout(() => {
                setOpenMobileMenu(false);
            }, 1);
        }
    }, [width, openMobileMenu]);

    return (
        <Fade in={!navbarIsDisabled && (!isScrollingDown || scrollY < 500)}>
            <NavigationWrapper center scrolledDown={isScrolledDown} reverseContrast={applyReverseContrast}>
                <FlexBox horizontal="between" vertical="center" id="navigation-main-conteiner">
                    <PageLogo isScrolledDown={isScrolledDown} forceAlternativeLogo={openMobileMenu} />

                    {width <= 1000 && <MobileMenuButton onClick={handleOpenMobileMenu}></MobileMenuButton>}

                    <FlexBox vertical="center" sx={{ height: "100%" }} id="routes-wrapper" className={openMobileMenu ? "scroll-in" : ""}>
                        <GeneralRoutes />
                        <hr></hr>
                        {(() => {
                            if (isAuthenticated && userData) {
                                return <AuthenticatedUserRoutes userData={userData} />;
                            } else {
                                return <AnonymousRoutes />;
                            }
                        })()}
                    </FlexBox>
                </FlexBox>
            </NavigationWrapper>
        </Fade>
    );
};

export default Navigation;
