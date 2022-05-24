// Tools
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";
import { StyledDialogBase, BackgroundIcon, StyledDialogTitle, StyledDialogContent, StyledDialogActions } from "@/components/create/_utils/styled_components/Dialog";
// Material UI Icons
import WarningAmber from "@mui/icons-material/WarningAmber";

const CreateAnAccountModel: FunctionComponent = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const LOCAL_STORAGE_KEY = "create-content-account-notification-landmark";

    useEffect(() => {
        let isMounted = true;
        const openFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
        setOpen(!Boolean(openFromLocalStorage));

        if (!openFromLocalStorage) {
            if (isMounted) {
                setTimeout(() => {
                    localStorage.setItem(LOCAL_STORAGE_KEY, "notified");
                }, 3000);
            }
        }

        return () => {
            isMounted = false;
        };
    }, [setOpen]);

    return (
        <StyledDialogBase open={open}>
            <StyledDialogTitle>
                <Typography variant="h1">Warning!</Typography>
            </StyledDialogTitle>
            <StyledDialogContent>
                <Typography variant="body2">
                    Without creating an account <strong>you will not be able to create</strong> an actual content. However, I sincerely encourage You to spend a while and play around at least a bit
                    with the tools that I had prepared. If you eventually decide to create an account and then request for adding your content into the application, you will have to wait until any
                    administrator verify this content in order to ensure either good quality and lack of any kind of inappropriate content.
                </Typography>
            </StyledDialogContent>
            <BackgroundIcon>
                <WarningAmber />
            </BackgroundIcon>
            <StyledDialogActions sx={{ justifyContent: "flex-start", paddingLeft: "24px" }}>
                <StyledButton primary>Okey</StyledButton>
            </StyledDialogActions>
        </StyledDialogBase>
    );
};

export default CreateAnAccountModel;
