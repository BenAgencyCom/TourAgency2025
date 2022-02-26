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
        </Content>
    );
};

export default LandmarkContentWrapper;
