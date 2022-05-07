// Tools
import { styled } from "@mui/system";

export default styled("span")(({ theme }) => ({
    fontSize: "1.2rem",
    cursor: "default",
    strong: {
        color: theme.palette.primary.main,
        fontWeight: 900,
    },
}));
