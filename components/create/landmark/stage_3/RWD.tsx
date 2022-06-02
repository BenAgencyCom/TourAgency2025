import type { SxProps } from "@mui/system";

export default {
    ".error-msg-wrapper": {
        ["@media (max-width:1100px)"]: {
            justifyContent: "flex-start",
            minHeight: "70px",
        },
    },
    ".single-landmark-type": {
        ["@media (max-width:600px)"]: {
            width: "130px",
            height: "130px",
            fontSize: "4rem",
        },
        ["@media (max-width:580px)"]: {
            width: "140px",
            height: "140px",
            fontSize: "4rem",
        },
    },

    ["@media (max-width:1000px)"]: {
        "#right-side": {
            display: "none",
        },
        "#left-side": {
            width: "100%",
            "#short-description-field,#select-landmark-type-field": {
                marginTop: "30px",
            },
            "#select-landmark-type-field": {
                marginBottom: "50px",
            },
        },
    },
    ["@media (max-width:600px)"]: {
        "#left-side": {
            ".tiles-wrapper": {
                justifyContent: "center",
            },
        },
    },
    ["@media (max-width:500px)"]: {
        "#left-side": {
            ".tiles-wrapper": {
                ".single-landmark-type": {
                    width: "calc(50% - 10px)",
                    marginRight: 0,
                    "&:nth-of-type(even)": {
                        marginLeft: "10px",
                    },
                },
            },
        },
    },
} as SxProps;
