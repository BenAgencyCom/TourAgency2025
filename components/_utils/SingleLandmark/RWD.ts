// Type
import type { SxProps } from "@mui/system";

export default {
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
        "div.single-landmark-picture": {
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
        "&:nth-of-type(1)": {
            marginTop: "0px",
        },
        "div.single-landmark-picture": {
            height: "500px",
        },
        h3: {
            fontSize: "3rem ",
            margin: "0 0 10px 0",
        },
    },
    ["@media (max-width:800px)"]: {
        "div.single-landmark-picture": {
            height: "400px",
        },
    },
    ["@media (max-width:700px)"]: {
        "div.single-landmark-picture": {
            height: "350px",
        },
        h3: {
            fontSize: "2.5rem ",
            lineHeight: "36px",
        },
    },
    ["@media (max-width:600px)"]: {
        "div.single-landmark-picture": {
            height: "300px",
        },
    },
    ["@media (max-width:500px)"]: {
        "div.single-landmark-picture": {
            height: "250px",
        },
    },
    ["@media (max-width:400px)"]: {
        h3: {
            fontSize: "2rem ",
            lineHeight: "30px",
        },
    },
} as SxProps;
