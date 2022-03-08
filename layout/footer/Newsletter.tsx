// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
// Other components
import Link from "next/link";
// Material UI Icons
import Mail from "@mui/icons-material/Mail";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import YouTube from "@mui/icons-material/YouTube";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

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
const SocialMedia = styled(ButtonBase)(({ theme }) => ({
    background: theme.palette.primary.main,
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 15,
    svg: {
        fontSize: "1.8rem",
    },
}));
const InputWrapper = styled(Box)(({ theme }) => ({
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
        <NewsletterWrapper column horizontal="end">
            <FlexBox vertical="center">
                <MailIcon></MailIcon>
                <h4>Subscribe to our newsletter</h4>
            </FlexBox>

            <InputWrapper>
                <InputBase placeholder="youremail@gmail.com"></InputBase>
                <Button color="primary" variant="contained">
                    Join
                </Button>
            </InputWrapper>

            <FlexBox>
                <SocialMedia>
                    <Twitter></Twitter>
                </SocialMedia>
                <SocialMedia>
                    <Instagram></Instagram>
                </SocialMedia>
                <SocialMedia>
                    <YouTube></YouTube>
                </SocialMedia>
            </FlexBox>
        </NewsletterWrapper>
    );
};

export default Newsletter;
