// Tools
import { styled, alpha } from "@mui/system";
// Material UI Components
import Step from "@mui/material/Step";

export default styled(Step)(({ theme }) => ({
    svg: {
        width: "40px",
        height: "40px",
    },
    ".MuiStepLabel-label": {
        fontSize: "1.2rem",
        fontWeight: 300,
        color: theme.palette.text.primary,
        transition: "color .4s ease-in-out",
    },
    ".MuiSvgIcon-root": {
        color: alpha(theme.palette.text.primary, 0.7),
        cursor: "pointer",
        "&:hover": {
            color: alpha(theme.palette.text.primary, 0.6),
        },
        "&.Mui-active": {
            color: `${theme.palette.primary.main} !important`,
        },
    },
    ".MuiStepIcon-text": {
        fill: theme.palette.text.primary,
        transition: "fill .4s ease-in-out",
    },
    ["@media (max-width:1600px)"]: {
        svg: {
            width: "32px",
            height: "32px",
        },
        ".MuiStepLabel-label": {
            fontSize: "1rem",
        },
    },
}));
