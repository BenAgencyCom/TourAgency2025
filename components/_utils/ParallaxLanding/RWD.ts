import type { SxProps } from "@mui/system";

export default {
    "h1.long-text": {
        fontSize: "6rem",
        lineHeight: "100px",
        ["@media (max-width:1500px)"]: {
            fontSize: "5.5rem",
            lineHeight: "90px",
        },
        ["@media (max-width:1300px)"]: {
            fontSize: "5rem",
            lineHeight: "80px",
        },
        ["@media (max-width:800px)"]: {
            fontSize: "4.5rem",
            lineHeight: "70px",
        },
        ["@media (max-width:700px)"]: {
            fontSize: "3.5rem",
            lineHeight: "60px",
        },
        ["@media (max-width:600px)"]: {
            fontSize: "3rem",
            lineHeight: "50px",
        },
        ["@media (max-width:500px)"]: {
            fontSize: "2.5rem",
            lineHeight: "45px",
        },
    },
    ".information": {
        maxWidth: "calc(100% - 350px)",
    },
    ["@media (max-width:1500px)"]: {
        h1: {
            fontSize: "8rem",
            lineHeight: "120px",
        },
        ".colored-header": {
            fontSize: "1.5rem",
        },
        "span.colored-bar": {
            width: "100px",
        },
    },
    //
    ["@media (max-width:1000px)"]: {
        ".information": {
            maxWidth: "calc(100% - 40px)",
        },
        h1: {
            fontSize: "7rem",
            lineHeight: "100px",
        },
        "span.colored-bar": {
            width: "70px",
        },
        ".colored-header": {
            fontSize: "1.4rem",
        },
        p: {
            fontSize: "1.3rem",
        },
    },
    //
    ["@media (max-width:700px)"]: {
        h1: {
            fontSize: "6rem",
            lineHeight: "80px",
            margin: "5px 0",
        },
    },
    //
    ["@media (max-width:600px)"]: {
        h1: {
            fontSize: "5rem",
            lineHeight: "70px",
        },
    },
    //
    ["@media (max-width:500px)"]: {
        h1: {
            fontSize: "4rem",
            lineHeight: "60px",
        },
        p: {
            fontSize: "1.2rem",
        },
        "button.explore": {
            position: "relative",
        },
    },
    //
    ["@media (max-width:400px)"]: {
        h1: {
            fontSize: "3.5rem",
            lineHeight: "50px",
            margin: "10px 0",
        },
        "span.colored-bar": {
            width: "50px",
        },
        ".colored-header": {
            fontSize: "1.2rem",
            margin: "0 15px",
        },
        p: {
            fontSize: "1.1rem",
        },
    },
} as SxProps;
