import type { SxProps } from "@mui/system";

export default {
    // Some general and frequently toggled properties
    ".entire-field-image": {
        height: "550px",
    },
    ".splitted-field-image": {
        height: "400px",
    },
    // RWD
    ["@media (max-width:1300px)"]: {
        ".entire-field-image": {
            height: "450px",
        },
    },
    //
    ["@media (max-width:1100px)"]: {
        padding: "0",
        ".entire-field-image": {
            height: "400px",
        },
        ".splitted-field-image": {
            margin: "20px 0",
        },
        ".splitted-content-field": {
            flexDirection: "column",
            ">*": {
                width: "100% !important",
            },
        },
        h3: {
            letterSpacing: "-1px",
            margin: "50px 0 20px 20px",
            paddingRight: "10px",
        },
        p: {
            padding: "0 10px",
            margin: "10px 0",
        },
    },
    //
    ["@media (max-width:500px)"]: {
        ".entire-field-image, .splitted-field-image": {
            height: "350px",
        },
    },
} as SxProps;
