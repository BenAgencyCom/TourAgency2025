import type { SxProps } from "@mui/system";

export default {
    ".there-are-no-results": {
        marginTop: "250px",
        ["@media (max-height:1300px)"]: {
            marginTop: "150px",
        },
        ["@media (max-height:1150px)"]: {
            marginTop: "100px",
        },
        ["@media (max-height:1050px)"]: {
            marginTop: "50px",
        },
    },
    ".description-content-field": {
        // Image size
        ".image-field": {
            ["@media (max-width:1100px)"]: {
                "&.full-size": {
                    height: "500px",
                },
            },
            ["@media (max-width:900px)"]: {
                "&.full-size": {
                    height: "400px",
                },
            },
        },
        // Splitted
        ".splitted-field": {
            ["@media (max-width:1000px)"]: {
                flexDirection: "column",
                minHeight: "auto",
                ".splitted-subfield": {
                    width: "100%",
                    "&:nth-of-type(1)": {
                        marginBottom: "20px",
                    },
                    ".splitted.image-field": {
                        height: "350px",
                    },
                },
            },
            ["@media (max-width:500px)"]: {
                ".splitted-subfield": {
                    ".splitted.image-field": {
                        height: "250px",
                    },
                },
            },
        },
    },

    // Header
    ["@media (max-width:660px)"]: {
        ".description-content-field": {
            ".description-content-field-header": {
                flexDirection: "column",
                alignItems: "flex-start",
            },
            hr: {
                margin: "30px 0",
            },
            "svg.validation-error": {
                marginRight: "-10px",
            },
        },
    },
} as SxProps;
