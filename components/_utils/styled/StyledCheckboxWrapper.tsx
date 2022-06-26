// Tools
import { styled } from "@mui/system";
// Material UI Components
import FormControlLabel from "@mui/material/FormControlLabel";

export default styled(FormControlLabel)(({ theme }) => ({
    ".MuiCheckbox-root": {
        height: "30px",
        width: "40px",
        padding: "0",
        ".MuiSvgIcon-root": {
            color: theme.palette.text.primary,
        },
        "&.Mui-checked": {
            ".MuiSvgIcon-root": {
                color: theme.palette.primary.main,
            },
        },
    },
    ".MuiTypography-root": {
        fontSize: "1.1rem",
        userSelect: "none",
        paddingLeft: "5px",
    },
}));
