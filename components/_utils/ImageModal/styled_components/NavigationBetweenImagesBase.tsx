// Tools
import RWD from "../RWD";
import { styled } from "@mui/system";

export default styled("div")(({ theme }) => ({
    padding: "5px",
    position: "absolute", //
    transform: "translateX(-50%)",
    left: "50%",
    bottom: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: theme.palette.background.default,
    borderRadius: "5px",
    button: {
        color: theme.palette.text.primary,
        "&:disabled": {
            color: theme.palette.text.primary,
            opacity: 0.5,
        },
    },
    strong: {
        fontSize: "1.4rem",
        margin: "0 30px",
        width: "60px",
        userSelect: "none",
        fontWeigt: "500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));
