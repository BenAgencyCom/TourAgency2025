// Tools
import { alpha, styled } from "@mui/system";

export default styled("div")(({ theme }) => ({
    left: "50%",
    top: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    maxHeight: "500px",
    width: "100vw",
    maxWidth: "550px",
    padding: "10px 20px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.palette.text.primary,
    ["@media (min-width: 800px)"]: {
        background: "#fff",
        marginTop: "5vh",
        height: "100vh",
    },

    "#login-header-wrapper": {
        flexGrow: 1,
        display: "flex",
        alignItems: "flex-end",
        marginBottom: "20px",
        h2: {
            userSelect: "none",
        },
    },
    ".MuiInputBase-root": {
        width: "400px",
        maxWidth: "calc(100vw - 20px)",
    },
    "#continue-button": {
        height: "40px",
        width: "250px",
        maxWidth: "calc(100vw - 20px)",
        marginBottom: "10px",
        position: "relative",
    },
    "span.navigation": {
        padding: "5px 10px",
        marginTop: "5px",
        borderRadius: "3px",
        cursor: "pointer",
        transition: "background .3s ease-in-out",
        "&:nth-of-type(1)": {
            marginTop: "0",
        },
        "&:hover": {
            background: alpha(theme.palette.primary.main, 0.2),
        },
    },
}));
