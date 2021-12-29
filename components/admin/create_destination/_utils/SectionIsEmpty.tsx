// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
// Material UI Icons

const Wrapper = styled(Box)(({ theme }) => ({
    display: "flex", //
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingBottom: "100px",
    "&>svg": {
        fontSize: "10rem",
        color: theme.palette.primary.main,
    },
}));

interface SectionIsEmptyProps {
    icon: ReactNode;
    buttonMsg: string;
    header: string;
    onClick: () => void;
}

const SectionIsEmpty: FunctionComponent<SectionIsEmptyProps> = (props) => {
    return (
        <Fade in={true}>
            <Wrapper>
                {props.icon}
                <Typography variant="h3" sx={{ textAlign: "center", color: "text.primary" }}>
                    {props.header}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={props.onClick}>
                    {props.buttonMsg}
                </Button>
            </Wrapper>
        </Fade>
    );
};

export default SectionIsEmpty;
