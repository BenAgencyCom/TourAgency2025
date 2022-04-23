import type { SxProps } from "@mui/system";

export default {
    ["@media (max-width:1500px)"]: {
        ".MuiStepper-root": {
            left: "10px",
        },
    },
    ["@media (max-width:1300px)"]: {
        ".MuiStepLabel-label": {
            fontSize: "1rem",
        },
    },
} as SxProps;
