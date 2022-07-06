// Tools
import { styled } from "@mui/system";
// Styled components
export default styled("div")(({ theme }) => ({
    paddingRight: "100px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "calc(100% - 750px)",
    ".stars-wrapper": {
        display: "flex",
        margin: "10px 0",
        svg: {
            color: theme.palette.primary.main,
            fontSize: "2.5rem",
        },
    },
    ["@media (max-width:1500px)"]: {
        width: "calc(100% - 650px)",
        paddingRight: "50px",
    },
    ["@media (max-width:1200px)"]: {
        width: "100%",
        padding: "0",
    },
}));
