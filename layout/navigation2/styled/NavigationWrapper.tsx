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
    height: "150px",
    padding: "10px 0",
    "div.conteiner": {
        maxWidth: "1920px",
        width: "calc(100vw - 50px)",
        height: "100%",
        padding: "0 100px",
    },
    ...(props.scrolledDown && {
        padding: "10px 0",
        maxHeight: "70px",
        height: "70px",
        background: theme.palette.text.primary,
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
            color: `${props.reverseContrast ? theme.palette.text.primary : "#fff"} !important`,
            height: "100%",
        }),
    },
}));
