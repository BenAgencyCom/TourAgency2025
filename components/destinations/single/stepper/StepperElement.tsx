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
        fontSize: "1.1rem",
        fontWeight: 300,
        color: theme.palette.text.primary,
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
    },
}));
