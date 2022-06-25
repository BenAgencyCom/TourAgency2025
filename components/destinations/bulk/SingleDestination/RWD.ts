import { alpha } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";

export default {
    marginBottom: "60px",
    background: alpha("#fff", 0.9),
    borderRadius: "10px",
    boxSizing: "border-box",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    cursor: "default",
    display: "flex",
    justifyContent: "space-between",
    h2: {
        margin: "10px 0",
    },
    ".single-destination-picture": {
        width: "calc(50% - 10px)",
        minHeight: "350px",
    },
    ".single-destination-information": {
        width: "calc(50% - 10px)",
        position: "relative",
        zIndex: "1",
        ".background-map": {
            maxWidth: "500px",
            width: "100%",
            top: "-22%",
            right: "-8%",
            zIndex: -1,
        },
        ".landmarks-wrapper": {
            flexGrow: 1,
            width: "100%",
            mb: "20px",
            ".single-landmark": {
                width: "calc(32.5%)",
            },
        },
    },
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
            minHeight: "auto",
            height: "450px",
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
            "&.skeleton": {
                padding: "0",
            },
        },
        "&.skeleton": {
            padding: "20px",
            ".single-destination-picture": {
                marginBottom: "10px",
            },
            ".landmarks-wrapper": {
                height: "200px",
            },
            ".description": {
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
        "&.skeleton": {
            padding: "10px",
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
        "&.skeleton": {
            ".landmarks-wrapper": {
                height: "840px",
            },
        },
    },
} as SxProps;
