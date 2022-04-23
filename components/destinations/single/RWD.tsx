// Tools
import { styled } from "@mui/system";
// Styled components
import ContentContainter from "@/components/_utils/styled/ContentContainter";

export default styled(ContentContainter)(({ theme }) => ({
    // Some general and frequently toggled properties
    margin: "0 !important",
    "section#description": {
        ".entire-field-image": {
            height: "700px",
        },
        ".splitted-field-image": {
            height: "400px",
        },
    },

    // RWD
    ["@media (max-width:1500px)"]: {
        ".MuiStepper-root": {
            left: "10px",
        },
        "section#landing-wrapper": {
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
    },
    ["@media (max-width:1300px)"]: {
        ".MuiStepLabel-label": {
            fontSize: "1rem",
        },
        "section#description": {
            ".entire-field-image": {
                height: "450px",
            },
        },
    },
    ["@media (max-width:1000px)"]: {
        "section#landing-wrapper": {
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
        "#destination-general-stats": {
            h5: {
                fontSize: "4rem",
                lineHeight: "70px",
            },
        },
        "section#description": {
            padding: "0",
        },
        "section#landmarks": {
            paddingBottom: "150px",
            "div.landmarks-wrapper": {
                flexDirection: "column",
                "div.single-landmark": {
                    width: "100%",
                    margin: "60px 0 0 0",
                    height: "auto",
                    "&:nth-of-type(1)": {
                        marginTop: "0px",
                    },
                    "div.single-landmark-picture": {
                        height: "500px",
                    },
                    ".read-more": {
                        marginTop: "10px",
                    },
                },
            },
        },
    },
    ["@media (max-width:800px)"]: {
        "#destination-general-stats": {
            h5: {
                fontSize: "3rem",
                lineHeight: "55px",
            },
            h6: {
                fontSize: "1rem",
            },
        },
        "section#description": {
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
        "div.landmarks-wrapper": {
            "div.single-landmark": {
                "div.single-landmark-picture": {
                    height: "400px",
                },
            },
        },
    },
    ["@media (max-width:700px)"]: {
        "#destination-general-stats": {
            flexDirection: "column",
            ".single-stat": {
                marginTop: "50px",
                width: "100%",
                "&:nth-of-type(1)": {
                    marginTop: "0px",
                },
            },
            h5: {
                fontSize: "4rem",
                lineHeight: "70px",
            },
        },
        "section#landmarks": {
            "div.landmarks-wrapper": {
                "div.single-landmark": {
                    "div.single-landmark-picture": {
                        height: "350px",
                    },
                },
            },
        },
    },
    ["@media (max-width:600px)"]: {
        "section#landmarks": {
            "div.landmarks-wrapper": {
                "div.single-landmark": {
                    "div.single-landmark-picture": {
                        height: "300px",
                    },
                },
            },
        },
    },
    ["@media (max-width:500px)"]: {
        "section#landing-wrapper": {
            h1: {
                fontSize: "6rem",
                lineHeight: "90px",
            },
            p: {
                fontSize: "1.2rem",
            },
            "button.explore": {
                position: "relative",
            },
        },
        "section#description": {
            ".entire-field-image, .splitted-field-image": {
                height: "350px",
            },
        },
        "section#landmarks": {
            "div.landmarks-wrapper": {
                "div.single-landmark": {
                    "div.single-landmark-picture": {
                        height: "250px",
                    },
                },
            },
        },
    },
    ["@media (max-width:400px)"]: {
        "section#landing-wrapper": {
            h1: {
                fontSize: "5.5rem",
                lineHeight: "80px",
                margin: "10px 0",
            },
            "span.colored-bar": {
                width: "60px",
            },
            ".colored-header": {
                fontSize: "1.3rem",
            },
        },
    },
}));
