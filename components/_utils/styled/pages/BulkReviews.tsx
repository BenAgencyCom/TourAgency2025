// Tools
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
    margin: "50px 0 100px 0",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    ["@media (max-width:1200px)"]: {
        flexDirection: "column-reverse",
    },
}));

export const LeftSideContent = styled("div")(({ theme }) => ({
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

export const PictureWrapper = styled("div")(({ theme }) => ({
    width: "700px",
    position: "relative",
    borderRadius: "0px 50px 0px 50px",
    overflow: "hidden",
    height: "550px",
    ["@media (max-width:1700px)"]: {
        width: "600px",
    },
    ["@media (max-width:1400px)"]: {
        width: "500px",
        height: "450px",
    },
    ["@media (max-width:1200px)"]: {
        width: "100%",
        marginBottom: "20px",
        minHeight: "auto",
        height: "550px",
    },
    ["@media (max-width:1000px)"]: {
        height: "500px",
        borderRadius: "5px",
    },
    ["@media (max-width:600px)"]: {
        height: "400px",
    },
}));

export const MainHeader = styled("div")(({ theme }) => ({
    margin: "10px 0 0 0 ",
    position: "relative",
    cursor: "default",
    ".main-text": {
        position: "relative",
        zIndex: 2,
    },
}));
