// Tools
import useSnackbar from "@/hooks/useSnackbar";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
// Material UI Components
import Checkbox from "@mui/material/Checkbox";
// Styled components
import StyledCheckboxWrapper from "@/components/_utils/styled/StyledCheckboxWrapper";

const RememberMe: FunctionComponent = () => {
    const displaySnackbar = useSnackbar();

    const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
        displaySnackbar({
            msg: `Credentials ${e.target.checked ? "will" : "won't"} be saved`,
            severity: "success",
            hideAfter: 1500,
        });
    };
    return (
        <StyledCheckboxWrapper
            control={<Checkbox defaultChecked onChange={onChecked} />} //
            label="Remember me"
            sx={{ my: "5px" }}
        />
    );
};

export default RememberMe;
