// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Styled Components
const Content = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
}));

const ContentShape = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "10px",
    transition: "opacity .3s",
    "&:nth-child(2)": {
        background: "#fff",
        width: "calc(100% + 10px)",
        height: "calc(100% + 10px)",
        transform: "translate(-50%,-50%) rotate(3deg)",
        opacity: 0.75,
    },
    "&:nth-child(3)": {
        background: theme.palette.primary.main,
        width: "calc(100% - 30px)",
        height: "calc(100% - 30px)",
        transform: "translate(-50%,-50%) rotate(-10deg)",
        opacity: 0.75,
    },
}));

interface LandmarkContentWrapperProps {
    children: ReactNode;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}
const LandmarkContentWrapper: FunctionComponent<LandmarkContentWrapperProps> = (props) => {
    return (
        <Content>
            <Content
                sx={{ zIndex: 1 }} //
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            >
                {props.children}
            </Content>

            <ContentShape className="content-shape"></ContentShape>
            <ContentShape className="content-shape"></ContentShape>
        </Content>
    );
};

export default LandmarkContentWrapper;
