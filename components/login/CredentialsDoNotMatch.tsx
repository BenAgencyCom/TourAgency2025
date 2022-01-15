// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Material UI Icons
import ErrorOutline from "@mui/icons-material/ErrorOutline";
// Styled components

const Communique = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    mt: theme.spacing(3),
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "default",
}));

interface CredentialsDoNotMatchProps {
    credentialsDoNotMatch: boolean;
}

const CredentialsDoNotMatch: FunctionComponent<CredentialsDoNotMatchProps> = (props) => {
    if (props.credentialsDoNotMatch)
        return (
            <Communique variant="h6">
                <ErrorOutline sx={{ mr: 1 }}></ErrorOutline>
                <span>Credentials do not match</span>
            </Communique>
        );
    else
        return (
            <Communique variant="h6">
                <br />
            </Communique>
        );
};

export default CredentialsDoNotMatch;
