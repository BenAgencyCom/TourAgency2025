// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";

const Wrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    paddingRight: "10px",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": { width: "8px" },
    "&::-webkit-scrollbar-track": { boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)" },
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
            <div>{props.children}</div>
        </Wrapper>
    );
};

export default ScrollableBox;
