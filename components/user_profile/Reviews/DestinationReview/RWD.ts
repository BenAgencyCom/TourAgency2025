// Type
import type { SxProps } from "@mui/system";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "calc(50% - 20px)",
    background: "white",
    borderRadius: "10px",
    padding: "10px",
    position: "relative",
    height: "620px",
    marginTop: "20px",
    "&:nth-of-type(1)": {
        marginTop: "0 !important",
    },
    ".single-destination-review-body": {
        height: "250px",
        "&.extended": {
            width: "100% ! important",
            height: "100% ! important",
        },
        p: {
            flexGrow: 1,
        },
    },
    ".single-destination-review-picture": {
        height: "350px",
    },
    ["@media (max-width:1200px)"]: {
        height: "650px",
        ".single-destination-review-body": {
            height: "280px",
        },
    },
    ["@media (max-width:1000px)"]: {
        height: "auto",
        width: "100%",
        marginLeft: "0",
        flexDirection: "row",
        marginTop: "60px",
        ".single-destination-review-picture": {
            width: "400px",
        },
        ".single-destination-review-body": {
            height: "auto",
            width: "calc(100% - 420px)",
        },
    },
    ["@media (max-width:850px)"]: {
        ".single-destination-review-picture": {
            width: "350px",
        },
        ".single-destination-review-body": {
            width: "calc(100% - 370px)",
        },
    },
    ["@media (max-width:750px)"]: {
        flexDirection: "column",
        ".single-destination-review-picture": {
            width: "100%",
        },
        ".single-destination-review-body": {
            width: "100%",
        },
    },
    ["@media (max-width:500px)"]: {
        ".single-destination-review-picture": {
            height: "250px",
        },
    },
} as SxProps;
