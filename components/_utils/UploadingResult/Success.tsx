// Tools
import Router from "next/router";
import { useEffect } from "react";
import useSnackbar from "@/hooks/useSnackbar";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
// Other components
import Link from "next/link";
// Material UI Icons
import Check from "@mui/icons-material/Check";
// Styled components
import RedirectBar from "./styled_components/RedirectBar";
import ButtonWrapper from "./styled_components/ButtonsWrapper";
import RedirectBarWrapper from "./styled_components/RedirectBarWrapper";

interface SuccessProps {
    msg: string;
    redirectURL: string;
}

const Success: FunctionComponent<SuccessProps> = (props) => {
    const displaySnackbar = useSnackbar();

    useEffect(() => {
        displaySnackbar({
            msg: `Everything went fine!`,
            severity: "success",
            hideAfter: 1500,
        });
    }, [displaySnackbar]);

    useEffect(() => {
        setTimeout(() => {
            let isMounted = true;

            setTimeout(() => {
                if (isMounted) {
                    Router.push(props.redirectURL);
                }
            }, 3750);

            return () => {
                isMounted = false;
            };
        });
    }, [props.redirectURL]);

    return (
        <Fade in={true}>
            <div className="result-content">
                <Check className="main-icon success" />
                <Typography variant="body1">{props.msg}</Typography>
                <RedirectBarWrapper>
                    <RedirectBar />
                </RedirectBarWrapper>

                <ButtonWrapper status="success">
                    <Link href={props.redirectURL} passHref>
                        <ButtonBase>Continue</ButtonBase>
                    </Link>
                </ButtonWrapper>
            </div>
        </Fade>
    );
};

export default Success;
