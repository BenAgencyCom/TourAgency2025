// Tools
import { styled } from "@mui/system";
// Material UI Components
import Typography from "@mui/material/Typography";

export default styled(Typography)(({ theme }) => ({
    margin: "20px 0",
    fontSize: "1.2rem",
    cursor: "default",
    strong: {
        color: theme.palette.primary.main,
        fontWeight: 900,
    },
}));
