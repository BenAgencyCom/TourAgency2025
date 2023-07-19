// Tools
import { styled } from "@mui/system";
import useWindowSizes from "@/hooks/useWindowSizes";
// Types
import type { FunctionComponent } from "react";
// Other components
import Link from "next/link";
import Image from "next/image";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled("div", {
    shouldForwardProp: (prop: string) => !["isScrolledDown"].includes(prop),
})<{ isScrolledDown: boolean }>(({ theme, ...props }) => {
    const size = props.isScrolledDown ? "60px" : "80px";
    return {
        position: "relative",
        zIndex: 1,
        width: size,
        height: size,
        maxHeight: size,
        transition: "all .3s",
    };
});

const Header = styled("h4", {
    shouldForwardProp: (prop: string) => !["isScrolledDown"].includes(prop),
})<{ isScrolledDown: boolean }>(({ theme, ...props }) => ({
    marginLeft: "10px",
    fontSize: props.isScrolledDown ? "1.5rem !important" : "2rem",
    fontWeight: 900,
    userSelect: "none",
}));
interface PageLogoProps {
    forceAlternativeLogo: boolean;
    isScrolledDown: boolean;
}
const PageLogo: FunctionComponent<PageLogoProps> = (props) => {
    const { width } = useWindowSizes();
    const isScrolledDown = props.isScrolledDown;
    const src: string = isScrolledDown || props.forceAlternativeLogo ? "/logo_reversed_contrast.png" : "/logo.png";

    return (
        <FlexBox vertical="center" id="page-logo">
            <Wrapper isScrolledDown={isScrolledDown}>
                <Link href="/">
                    <a tabIndex={-1} style={{ position: "relative" }}>
                        <Image
                            src={src} //
                            layout="fill"
                            objectPosition="center"
                            objectFit="cover"
                            alt="logo"
                            unoptimized={true}
                            priority
                        ></Image>
                    </a>
                </Link>
            </Wrapper>
            {/*  */}
            {width > 1200 && (
                <Header className="contrast-color alternative-font-family" isScrolledDown={props.isScrolledDown}>
                    Tour Agency
                </Header>
            )}
        </FlexBox>
    );
};

export default PageLogo;
