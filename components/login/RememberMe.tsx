// Tools
import { styled } from "@mui/system";
import useSnackbar from "@/hooks/useSnackbar";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
// Material UI Components
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// Styled components
const RememberMeBase = styled(FormControlLabel)(({ theme }) => ({
    ".MuiCheckbox-root": {
        height: "30px",
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

const RememberMe: FunctionComponent = (props) => {
    const displaySnackbar = useSnackbar();

    const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
        displaySnackbar({
            msg: `Credentials ${e.target.checked ? "will" : "won't"} be saved`,
            severity: "success",
            hideAfter: 1500,
        });
    };
    return (
        <RememberMeBase
            control={<Checkbox defaultChecked onChange={onChecked} />} //
            label="Remember me"
            sx={{ my: "5px" }}
        />
    );
};

export default RememberMe;
