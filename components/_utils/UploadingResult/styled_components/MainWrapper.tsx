// Tools
import { styled } from "@mui/system";
// Styled components
export default styled("div")(({ theme }) => ({
    width: "100%",
    height: "calc(100vh - 360px)",
    position: "relative",
    "p, h3": {
        userSelect: "none",
        marginTop: "10px",
    },
    ".result-content": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
    },
    "svg.main-icon": {
        fontSize: "5rem",
        position: "relative",
        zIndex: "5",
        color: theme.palette.success.main,
        "&.success": {
            color: theme.palette.success.main,
        },
        "&.error": {
            color: theme.palette.error.main,
        },
    },
}));
