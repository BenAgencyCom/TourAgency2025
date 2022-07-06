// Types
import type { SxProps } from "@mui/system";

export default {
    ["@media (max-width:1100px)"]: {
        "div.add-tags": {
            flexDirection: "column",
            "div.tags": {
                marginLeft: 0,
                marginTop: "10px",
                flexWrap: "wrap",
            },
        },
    },
    ["@media (max-width:500px)"]: {
        padding: "40px 10px 20px 10px",
    },
} as SxProps;
