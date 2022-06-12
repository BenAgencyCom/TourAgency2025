// Tools
import RWD from "../RWD";
import { styled } from "@mui/system";

export default styled("div")(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50vw",
    transform: "translate(-50%, -50%)",
    maxWidth: "1920px",
    display: "flex",
    flexDirection: "column",
    "div.imageWrapper": {
        position: "relative",
        flexGrow: "1",
    },
    h4: {
        margin: "0",
        color: "#fff",
        fontSize: "1.5rem",
        userSelect: "none",
        fontWeight: "300",
        marginBottom: "10px",
        strong: {
            color: theme.palette.primary.main,
            fontWeight: 900,
        },
        "span.seperator": {
            margin: "0 10px",
        },
    },
    ...(RWD as any),
}));
