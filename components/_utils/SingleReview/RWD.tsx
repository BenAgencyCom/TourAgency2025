import type { SxProps } from "@mui/system";

export default {
    ["@media (max-width:1000px)"]: {
        "div.personal-information": {
            flexDirection: "column",
            alignItems: "flex-start",
        },
        marginTop: "60px",
    },
    ["@media (max-width:800px)"]: {
        "div.landmark-reviewer-avatar": {
            width: "100px",
            height: "100px",
        },

        "div.landmark-review-header": {
            "span.date": {
                fontSize: "1.1rem",
                strong: {
                    fontWeight: 500,
                },
            },
            h4: {
                fontSize: "2rem",
            },
        },
    },
    ["@media (max-width:700px)"]: {
        "div.landmark-review-header": {
            flexDirection: "column",
            "div.landmark-reviewer-avatar": {
                width: "90px",
                height: "90px",
                margin: "0 0 10px 0",
            },
            ".score": {
                fontSize: "2.5rem",
                height: "90px",
                width: "90px",
                marginRight: "10px",
            },
            "div.personal-information": {
                flexDirection: "row",
                alignItems: "flex-end",
            },
        },
        "div.landmark-review-tags": {
            margin: "0 0 10px 0",
        },
        p: {
            fontSize: "1.1rem",
        },
    },
    ["@media (max-width:600px)"]: {
        "div.landmark-review-header": {
            "div.landmark-reviewer-avatar": {
                marginLeft: "0",
                width: "90px",
                height: "90px",
            },
        },
    },
    ["@media (max-width:500px)"]: {
        "div.landmark-review-header": {
            "div.landmark-reviewer-avatar": {
                marginLeft: "0",
                width: "90px",
                height: "90px",
            },
            "div.personal-information": {
                flexDirection: "column",
                alignItems: "flex-start",
                h4: {
                    margin: 0,
                },
            },
        },
    },
} as SxProps;
