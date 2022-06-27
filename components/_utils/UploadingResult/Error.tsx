// Tools
import { styled } from "@mui/system";
import { useEffect } from "react";
import useSnackbar from "@/hooks/useSnackbar";
// Types
import type { FunctionComponent } from "react";
import type { ActionAfterError } from "./index";
// Material UI Components
import Fade from "@mui/material/Fade";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
// Other components
import Link from "next/link";
// Material UI Icons
import Close from "@mui/icons-material/Close";
// Styled components
import ButtonsWrapper from "./styled_components/ButtonsWrapper";
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

const StyledBackgroundHeader = styled(BackgroundHeader)(({ theme }) => ({
    left: "50%", //
    top: "50%",
    transform: "translate(-50%,-50%)",
}));

interface ErrorProps {
    msg: string;
    errorHTTPStatusCode?: number;
    actions: ActionAfterError[];
}

const Error: FunctionComponent<ErrorProps> = (props) => {
    const { msg, errorHTTPStatusCode, actions } = props;
    const displaySnackbar = useSnackbar();

    useEffect(() => {
        displaySnackbar({
            msg: `Something went wrong!`,
            severity: "error",
            hideAfter: 1500,
        });
    }, [displaySnackbar]);

    return (
        <Fade in={true}>
            <div className="result-content">
                <Close className="main-icon error" />
                <Typography variant="body1">{msg}</Typography>
                {(() => {
                    if (errorHTTPStatusCode !== undefined) {
                        return <StyledBackgroundHeader>{errorHTTPStatusCode}</StyledBackgroundHeader>;
                    }
                })()}
                {actions && actions.length && (
                    <ButtonsWrapper status="error">
                        {actions.map((action: any, index) => {
                            return (
                                <span key={index} className="element">
                                    {(() => {
                                        // Render redirect button
                                        if (Object(action).hasOwnProperty("url")) {
                                            return (
                                                <Link href={action.url} passHref>
                                                    <ButtonBase>{action.name}</ButtonBase>
                                                </Link>
                                            );
                                        }
                                        // Render button with onClick action
                                        else if (Object(action).hasOwnProperty("onClick")) {
                                            return <ButtonBase onClick={action.onClick}>{action.name}</ButtonBase>;
                                        }
                                    })()}
                                </span>
                            );
                        })}
                    </ButtonsWrapper>
                )}
            </div>
        </Fade>
    );
};

export default Error;
