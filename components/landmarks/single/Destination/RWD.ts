import type { SxProps } from "@mui/system";

export default {
    ["@media (max-width:800px)"]: {
        flexDirection: "column",
        ".destination-picture": {
            height: "400px",
            width: "100%",
        },
        ".destination-information-wrapper": {
            width: "100%",
            ".background-map": {
                height: "300px",
                order: 1,
                img: {
                    objectPosition: "center !important",
                },
            },
            ".read-more": {
                order: 2,
            },
        },
    },
    ["@media (max-width:600px)"]: {
        ".destination-picture": {
            borderRadius: "0",
        },
        ".destination-information-wrapper": {
            padding: "0 10px",
            ".background-map": {
                height: "250px",
            },
        },
    },
    ["@media (max-width:500px)"]: {
        ".destination-picture": {
            height: "350px",
        },
        ".destination-information-wrapper": {
            ".background-map": {
                height: "200px",
            },
        },
    },
    ["@media (max-width:400px)"]: {
        ".destination-information-wrapper": {
            ".background-map": {
                height: "150px",
            },
        },
    },
} as SxProps;
