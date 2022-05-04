// Types
import type { SxProps } from "@mui/system";

export default {
    ["@media (max-width:1200px)"]: {
        ".single-destination-picture": {
            width: "calc(45% - 10px)",
        },
        ".single-destination-information": {
            width: "calc(55% - 10px)",
        },
    },
    ["@media (max-width:1000px)"]: {
        flexDirection: "column",
        padding: "0 0 10px 0",
        ".single-destination-picture": {
            width: "100%",
            borderRadius: "10px 10px 0 0",
        },
        ".single-destination-information": {
            padding: "0 10px",
            width: "100%",
            ".background-map": {
                top: "0",
                right: "0",
                height: "calc(100% - 200px)",
                maxWidth: "calc(100% - 100px)",
                zIndex: -1,
                opacity: 0.4,
                img: {
                    objectPosition: "120% 20px !important",
                },
            },
            ".single-landmark": {
                height: "200px",
            },
        },
    },
    ["@media (max-width:800px)"]: {
        ".single-destination-information": {
            ".single-landmark": {
                height: "150px",
            },
        },
    },
    ["@media (max-width:700px)"]: {
        h2: {
            fontSize: "3rem",
        },
        ".single-destination-picture": {
            height: "350px",
        },
    },
    ["@media (max-width:600px)"]: {
        ".single-destination-picture": {
            height: "350px",
        },
    },
    ["@media (max-width:500px)"]: {
        ".single-destination-picture": {
            height: "300px",
        },
        ".single-destination-information": {
            ".landmarks-wrapper": {
                flexDirection: "column",
                ".single-landmark": {
                    width: "100%",
                    height: "280px",
                    marginBottom: "10px",
                },
            },
        },
    },
} as SxProps;
