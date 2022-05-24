// Tools
import theme from "@/colorTheme";
// Types
import type { SxProps } from "@mui/system";

export default {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "relative",
    zIndex: "2",
    h4: {
        margin: "20px 0",
        fontSize: "1.8rem",
        display: "flex",
        alignItems: "flex-end",
        fontWeight: "500",
        userSelect: "none",
        strong: {
            fontWeight: "700",
        },
        svg: {
            marginRight: "10px",
            fontSize: "2.5rem",
            color: theme.palette.primary.main,
        },
        ".primary": {
            color: theme.palette.primary.main,
        },
    },
} as SxProps;
