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
import NavigationWrapper from "./styled/NavigationWrapper";

const Navigation: FunctionComponent<MUIStyledCommonProps> = (props) => {
    const router = useRouter();
    // Redux
    const { scrollY } = useAppSelector((state) => state.windowSizes);
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

    return (
        <Fade in={!navbarIsDisabled && (!isScrollingDown || scrollY < 500)}>
            <NavigationWrapper center scrolledDown={isScrolledDown} reverseContrast={applyReverseContrast}>
                <FlexBox horizontal="between" vertical="center" className="conteiner">
                    <PageLogo />

                    <FlexBox vertical="center" sx={{ height: "100%" }}>
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
