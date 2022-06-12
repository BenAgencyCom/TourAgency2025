import { styled } from "@mui/system";

export default styled("h2")(({ theme }) => ({
    fontWeight: 900,
    userSelect: "none",
    position: "relative",
    margin: 0,
    fontSize: "3.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    svg: {
        fontSize: "10rem",
        marginBottom: "10px",
        color: theme.palette.primary.main,
    },
    "span.normal": {
        position: "relative",
        zIndex: 1,
        letterSpacing: "-2px",
        textTransform: "uppercase", //
    },
    ["@media (max-width:1500px)"]: {
        fontSize: "3rem",
        lineHeight: "55px",
    },
}));
