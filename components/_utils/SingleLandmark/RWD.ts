// Type
import type { SxProps } from "@mui/system";

export default {
    width: "calc((100% - 40px)/ 3)",
    marginLeft: "20px",
    boxSizing: "border-box",
    marginBottom: "20px",
    height: "550px",
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
        height: "290px",
        position: "relative",
        overflow: "hidden",
    },
    "&:nth-of-type(1),&:nth-of-type(4),&:nth-of-type(7),&:nth-of-type(10),&:nth-of-type(13),&:nth-of-type(16),&:nth-of-type(19),&:nth-of-type(22),&:nth-of-type(25),&:nth-of-type(28)": {
        marginLeft: "0px",
    },
    ["@media (max-width:1600px)"]: {
        h3: {
            fontSize: "2.2rem",
        },
    },
    ["@media (max-width:1500px)"]: {
        height: "500px",
        h3: {
            fontSize: "2rem",
            margin: "0 0 5px 0",
        },
        p: {
            fontSize: "1.2rem",
        },
    },
    ["@media (max-width:1300px)"]: {
        height: "450px",
        ".single-landmark-picture": {
            height: "200px",
        },
        h3: {
            fontSize: "1.9rem",
        },
        p: {
            fontSize: "1.1rem",
        },
    },
    ["@media (max-width:1200px)"]: {
        "div.localization-breadcrumbs": {
            fontSize: "1.1rem",
        },
        h3: {
            fontSize: "1.7rem",
        },
    },
    ["@media (max-width:1000px)"]: {
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
        h3: {
            fontSize: "3rem ",
            margin: "0 0 10px 0",
        },
    },
    ["@media (max-width:800px)"]: {
        ".single-landmark-picture": {
            height: "400px",
        },
    },
    ["@media (max-width:700px)"]: {
        minHeight: "600px",
        ".single-landmark-picture": {
            height: "350px",
        },
        h3: {
            fontSize: "2.5rem ",
            lineHeight: "36px",
        },
    },
    ["@media (max-width:600px)"]: {
        minHeight: "550px",
        ".single-landmark-picture": {
            height: "300px",
        },
    },
    ["@media (max-width:550px)"]: {
        minHeight: "600px",
    },
    ["@media (max-width:500px)"]: {
        minHeight: "550px",
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
    ["@media (max-width:400px)"]: {
        h3: {
            fontSize: "2rem ",
            lineHeight: "30px",
        },
    },
} as SxProps;
