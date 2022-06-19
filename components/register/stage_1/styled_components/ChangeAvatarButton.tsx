// Tools
import { styled } from "@mui/system";
// Material UI Components
import IconButton from "@mui/material/IconButton";

export default styled(IconButton)(({ theme }) => ({
    background: theme.palette.text.primary,
    color: "#fff",
    position: "absolute",
    right: "50px",
    bottom: "50px",
    width: "60px",
    height: "60px",
    svg: {
        fontSize: "2rem",
    },
    "&:hover": {
        background: theme.palette.primary.main,
    },
    ["@media (max-width:1600px)"]: {
        right: "45px",
        bottom: "45px",
    },
    ["@media (max-width:1500px)"]: {
        right: "40px",
        bottom: "40px",
    },
    ["@media (max-width:1200px)"]: {
        right: "35px",
        bottom: "35px",
    },
    ["@media (max-width:500px)"]: {
        right: "30px",
        bottom: "30px",
    },
    ["@media (max-width:400px)"]: {
        right: "25px",
        bottom: "25px",
    },
}));
