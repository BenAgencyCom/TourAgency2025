// Tools
import { useState } from "react";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import Link from "next/link";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";
import { StyledDialogBase, BackgroundIcon, StyledDialogTitle, StyledDialogContent, StyledDialogActions } from "@/components/create/_utils/styled_components/Dialog";
// Material UI Icons
import WarningAmber from "@mui/icons-material/WarningAmber";

const CreateAnAccountModel: FunctionComponent = (props) => {
    const [open, setOpen] = useState<boolean>(true);

    return (
        <StyledDialogBase open={open}>
            <StyledDialogTitle>Important</StyledDialogTitle>
            <StyledDialogContent>
                <Typography variant="body2">
                    Without having an account <strong>you will not be able to create</strong> an actual content. However, I sincerely encourage You to spend a while and play around with tools that I
                    had prepared. If you eventually decide to create an account and then request for adding your content into the application, you will have to wait until any administrator verify this
                    content in order to ensure either good quality and lack of any kind of inappropriate content.
                </Typography>
            </StyledDialogContent>
            <BackgroundIcon>
                <WarningAmber />
            </BackgroundIcon>
            <StyledDialogActions sx={{ justifyContent: "flex-start", paddingLeft: "24px" }}>
                <StyledButton primary onClick={() => setOpen(false)}>
                    Okey
                </StyledButton>
                <Link href="/login" passHref>
                    <StyledButton sx={{ ml: "10px" }}>Login</StyledButton>
                </Link>
                <Link href="/register" passHref>
                    <StyledButton>Register</StyledButton>
                </Link>
            </StyledDialogActions>
        </StyledDialogBase>
    );
};

export default CreateAnAccountModel;
