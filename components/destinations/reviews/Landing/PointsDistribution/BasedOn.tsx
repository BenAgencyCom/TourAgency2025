// Tools
import { styled } from "@mui/system";

export default styled("span")(({ theme }) => ({
    margin: "20px 0",
    fontSize: "1.2rem",
    cursor: "default",
    strong: {
        color: theme.palette.primary.main,
        fontWeight: 900,
    },
}));
