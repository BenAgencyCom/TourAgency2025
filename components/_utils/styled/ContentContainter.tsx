import { styled } from "@mui/system";

export default styled("section")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: "1450px",
    margin: "100px auto 0 auto",
    width: "100vw",
    padding: "0 20px",
    boxSizing: "border-box",
    color: theme.palette.text.primary,
}));