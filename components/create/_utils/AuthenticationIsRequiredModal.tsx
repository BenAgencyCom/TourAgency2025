// Tools
import { useState } from "react";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import Link from "next/link";
import LineIntroAnimation from "@/components/_utils/LineIntroAnimation";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";
import { StyledDialogBase, BackgroundIcon, StyledDialogTitle, StyledDialogContent, StyledDialogActions } from "@/components/create/_utils/styled_components/Dialog";
// Material UI Icons
import WarningAmber from "@mui/icons-material/WarningAmber";

const CreateAnAccountModel: FunctionComponent = () => {
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
                <LineIntroAnimation in={true} intro="bottom" outro="left" color="paperLight">
                    <StyledButton primary onClick={() => setOpen(false)}>
                        Okay
                    </StyledButton>
                </LineIntroAnimation>

                <LineIntroAnimation in={true} intro="top" outro="left" color="paperLight" delay={100}>
                    <Link href="/login" passHref>
                        <StyledButton>Login</StyledButton>
                    </Link>
                </LineIntroAnimation>

                <LineIntroAnimation in={true} intro="bottom" outro="left" color="paperLight" delay={200}>
                    <Link href="/register" passHref>
                        <StyledButton>Register</StyledButton>
                    </Link>
                </LineIntroAnimation>
            </StyledDialogActions>
        </StyledDialogBase>
    );
};

export default CreateAnAccountModel;
