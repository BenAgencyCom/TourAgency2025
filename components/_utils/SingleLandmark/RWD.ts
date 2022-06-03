// Type
import type { SxProps } from "@mui/system";

export default {
    width: "calc((100% - 40px)/ 3)",
    marginLeft: "20px",
    boxSizing: "border-box",
    marginBottom: "20px",
    height: "480px",
    borderRadius: "5px",
    background: "#fff",
    padding: "10px",
    cursor: "default",
    position: "relative",
    ".single-landmark-content": {
        flexGrow: "1",
        textAlign: "start",
    },
    ".single-landmark-picture": {
        width: "100%",
        height: "250px",
        position: "relative",
        overflow: "hidden",
    },

    ["@media (min-width:1341px)"]: {
        width: "calc((100% - 40px)/ 3)",
        "&:nth-of-type(1),&:nth-of-type(4),&:nth-of-type(7),&:nth-of-type(10),&:nth-of-type(13),&:nth-of-type(16),&:nth-of-type(19),&:nth-of-type(22),&:nth-of-type(25),&:nth-of-type(28)": {
            marginLeft: "0px",
        },
    },
    ["@media (max-width:1340px)"]: {
        height: "500px",
        width: "calc((100% - 40px)/ 2)",
        "&:nth-of-type(1),&:nth-of-type(3),&:nth-of-type(5),&:nth-of-type(7),&:nth-of-type(9),&:nth-of-type(11),&:nth-of-type(13),&:nth-of-type(15),&:nth-of-type(17),&:nth-of-type(19)": {
            marginLeft: "0px",
        },
        ".single-landmark-picture": {
            height: "270px",
        },
        p: {
            fontSize: "1.1rem",
        },
    },
    ["@media (max-width:1200px)"]: {
        "div.localization-breadcrumbs": {
            fontSize: "1.1rem",
        },
    },

    ["@media (max-width:900px)"]: {
        width: "100%",
        margin: "60px 0 0 0",
        height: "auto",
        minHeight: "550px",
        ",&:nth-of-type(1)": {
            marginTop: "0px",
        },
        ".single-landmark-picture": {
            height: "500px",
        },
    },
    ["@media (max-width:800px)"]: {
        ".single-landmark-picture": {
            height: "400px",
        },
    },
    ["@media (max-width:700px)"]: {
        ".single-landmark-picture": {
            height: "350px",
        },
    },
    ["@media (max-width:600px)"]: {
        ".single-landmark-picture": {
            height: "300px",
        },
    },

    ["@media (max-width:500px)"]: {
        ".single-landmark-picture": {
            height: "250px",
        },
        "span.landmark-type": {
            right: "10px",
            top: "270px",
            opacity: ".1",
            svg: {
                fontSize: "4rem",
            },
        },
    },
} as SxProps;
