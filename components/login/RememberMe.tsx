// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// Styled components
const RememberMeBase = styled(FormControlLabel)(({ theme }) => ({
    ".MuiCheckbox-root": {
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
    },
}));
interface RememberMeProps {
    //
}

const RememberMe: FunctionComponent<RememberMeProps> = (props) => {
    return (
        <RememberMeBase
            control={<Checkbox defaultChecked />} //
            label="Remember me"
            sx={{ my: "5px" }}
        />
    );
};

export default RememberMe;
