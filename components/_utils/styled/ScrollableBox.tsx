// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
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
    ["@media (max-width:800px)"]: {
        padding: "0 20px",
        width: "calc(100% - 20px)",
    },
    ["@media (max-width:600px)"]: {
        padding: "0 10px 0 10px",
        width: "calc(100% - 10px)",
    },
}));
interface ScrollableBoxProps {
    children: ReactNode;
    sx?: SxProps;
    className: string;
}
const ScrollableBox: FunctionComponent<ScrollableBoxProps> = (props) => {
    const { children, ...propsToForward } = props;
    return (
        <Wrapper {...propsToForward}>
            <FlexBox column>{children}</FlexBox>
        </Wrapper>
    );
};

export default ScrollableBox;
