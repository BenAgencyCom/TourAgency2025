// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Button from "@mui/material/Button";
// Material UI Icons
import AccountBox from "@mui/icons-material/AccountBox";
// Styled components
const BetterButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    fontWeight: 400,
    lineHeight: "20px",
}));

const NoAuthenticated: FunctionComponent = () => {
    return (
        <>
            <AccountBox sx={{ fontSize: "10rem" }}></AccountBox>
            <BetterButton sx={{ fontSize: "1.5rem" }} color="inherit">
                <span>
                    Login and <strong>share your opinion</strong>
                </span>
            </BetterButton>
            <BetterButton color="inherit">Don’t have an account yet? Create one now</BetterButton>
        </>
    );
};

export default NoAuthenticated;
