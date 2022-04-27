import type { SxProps } from "@mui/system";

export default {
    "section#landmarks": {
        ["@media (max-width:1200px)"]: {
            paddingBottom: "150px",
            "div.landmarks-wrapper": {
                flexDirection: "column",
            },
        },
        ["@media (max-width:1200px) and (min-width:1000px)"]: {
            "div.landmarks-wrapper": {
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
                    h3: {
                        fontSize: "3rem",
                    },
                },
            },
        },
    },
} as SxProps;
