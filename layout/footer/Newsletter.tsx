// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
// Material UI Icons
import Mail from "@mui/icons-material/Mail";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import YouTube from "@mui/icons-material/YouTube";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";
import ButtonWithColorTransition from "@/components/_utils/styled/ButtonWithColorTransition";

const MailIcon = styled(Mail)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "2.5rem",
    marginRight: "5px",
}));

const NewsletterWrapper = styled(FlexBox)(({ theme }) => ({
    h4: {
        margin: 0,
        fontSize: "1.7rem",
        color: "#fff",
        fontWeight: 500,
    },
}));
const SocialMedia = styled(ButtonWithColorTransition)(({ theme }) => ({
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 15,
    padding: 0,
    svg: {
        fontSize: "1.8rem",
    },
}));
const InputWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    margin: "20px 0",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    width: "100%",
    ".MuiInputBase-root": {
        padding: "3px 10px",
        transition: "background",
        position: "relative",
        width: "100%",
        "&.Mui-focused": {
            "&::before": {
                background: alpha("#fff", 0.7),
            },
        },
        "&::before": {
            content: "''",
            position: "absolute",
            top: "0",
            right: "-5px",
            height: "100%",
            width: "calc(100% + 10px)",
            background: alpha("#fff", 0.4),
            transition: "background .25s",
        },
        input: {
            position: "relative",
            zIndex: 1,
        },
    },
    ".MuiButton-root": {
        color: "white",
        padding: "0 20px",
    },
}));

const Newsletter: FunctionComponent = () => {
    return (
        <NewsletterWrapper column horizontal="end" className="newsletter">
            <FlexBox vertical="center" className="newsletter-icon-wrapper">
                <MailIcon></MailIcon>
                <h4>Subscribe to our newsletter</h4>
            </FlexBox>

            <InputWrapper className="newsletter-input-wrapper">
                <InputBase placeholder="there_is_no_newsletter@gmail.com"></InputBase>
                <ButtonWithColorTransition primary reverse sx={{ fontSize: "1.2rem", borderRadius: "0 10px 10px 0" }}>
                    Join
                </ButtonWithColorTransition>
            </InputWrapper>

            <FlexBox>
                <a href="https://github.com/BenAgencyCom" target="_blank" rel="noreferrer" tabIndex={-1}>
                    <SocialMedia primary reverse className="social-media-btn">
                        <Twitter></Twitter>
                    </SocialMedia>
                </a>
                <a href="https://github.com/BenAgencyCom" target="_blank" rel="noreferrer" tabIndex={-1}>
                    <SocialMedia primary reverse className="social-media-btn">
                        <Instagram></Instagram>
                    </SocialMedia>
                </a>

                <a href="https://github.com/BenAgencyCom" target="_blank" rel="noreferrer" tabIndex={-1}>
                    <SocialMedia primary reverse className="social-media-btn">
                        <YouTube></YouTube>
                    </SocialMedia>
                </a>
            </FlexBox>
        </NewsletterWrapper>
    );
};

export default Newsletter;
