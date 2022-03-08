// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    paddingRight: "10px",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": { width: "8px" },
    "&::-webkit-scrollbar-track": { boxShadow: `inset 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}` },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "2px",
    },
}));
interface ScrollableBoxProps {
    children: ReactNode;
    sx?: Record<string, any>;
}
const ScrollableBox: FunctionComponent<ScrollableBoxProps> = (props) => {
    return (
        <Wrapper sx={props.sx}>
            <FlexBox column>{props.children}</FlexBox>
        </Wrapper>
    );
};

export default ScrollableBox;
