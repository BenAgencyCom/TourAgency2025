// Tools
import { styled } from "@mui/system";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface NavigationWrapperProps {
    scrolledDown: boolean;
    reverseContrast: boolean;
}

export default styled(FlexBox, {
    shouldForwardProp: (prop: string) => {
        return !["scrolledDown", "reverseContrast"].includes(prop);
    },
})<NavigationWrapperProps>(({ theme, ...props }) => ({
    position: "fixed",
    top: 0,
    width: "calc(100vw)",
    zIndex: 1000,
    transition: "all .3s !important",
    maxHeight: "150px",
    height: "120px",
    padding: "10px 0",
    "div#navigation-main-conteiner": {
        maxWidth: "1920px",
        width: "calc(100vw - 50px)",
        height: "100%",
        transition: "padding .3s !important",
        padding: `0 ${props.scrolledDown ? "0 !important" : "100px"}`,
    },
    ...(props.scrolledDown && {
        padding: "10px 0",
        maxHeight: "70px",
        height: "70px",
        background: theme.palette.text.primary,
        boxShadow: "#fff 2px 0px 1px",
    }),
    a: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        button: {
            fontWeight: 500,
            "span.bwlt-text": {
                display: "flex",
                alignItems: "center",
                svg: {
                    marginRight: "5px",
                },
            },
        },
    },
    hr: {
        border: 0,
        height: "30px",
        width: "1px",
        margin: "0 100px",
        opacity: 0.6,
    },
    ".contrast-color": {
        ...(props.scrolledDown && {
            color: `${"#fff"} !important`,
            "&:hover, &:focus": {
                color: "#fff",
            },
        }),
        ...(!props.scrolledDown && {
            color: `${props.reverseContrast ? "#fff" : theme.palette.text.primary} !important`,
            height: "100%",
        }),
    },
    //
    // RWD
    //
    ["@media (max-width:1700px)"]: {
        hr: {
            margin: "0 50px",
        },
    },
    ["@media (max-width:1550px)"]: {
        "#page-logo": {
            h4: {
                fontSize: "2rem",
            },
        },
    },
    ["@media (max-width:1500px)"]: {
        "div#navigation-main-conteiner": {
            padding: "0 20px",
        },
    },
    ["@media (max-width:1350px)"]: {
        "#page-logo": {
            h4: {
                fontSize: "2rem",
            },
        },
        hr: {
            margin: "0 20px",
        },
    },
    ["@media (max-width:1000px)"]: {
        "div#navigation-main-conteiner": {
            padding: "0 50px",
            "div#routes-wrapper": {
                position: "fixed",
                background: theme.palette.text.primary,
                padding: "100px 0 0px 0",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                flexDirection: "column",
                justifyContent: "space-evenly",
                transition: "transform .3s",
                transform: "translateX(100%)",
                "&::after": {
                    content: "''",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.1,
                    filter: "blur(2px)",
                    backgroundImage: "url('/images/continents/mobile_navigation_background_full.jpg')",
                    ["@media (max-width:500px)"]: {
                        backgroundImage: "url('/images/continents/mobile_navigation_background_cropped.jpg')",
                    },
                },
                a: {
                    height: "auto",
                    "button,svg": {
                        color: "#fff !important",
                        fontSize: "2rem ",
                    },
                },
                "&.scroll-in": {
                    transform: "translateX(0%)",
                },
            },
        },
    },
    ["@media (max-width:800px)"]: {
        "div#navigation-main-conteiner": {
            padding: "0 20px",
        },
    },
    ["@media (max-width:500px)"]: {
        "div#navigation-main-conteiner": {
            padding: 0,
            width: "calc(100vw - 20px)",
        },
    },
}));
