// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled(FlexBox)(({ theme }) => ({
    margin: "100px auto 0 auto",
    minHeight: "calc(100vh - 100px)",
    h1: {
        fontSize: "30rem",
        margin: 0,
        userSelect: "none",
        color: theme.palette.text.primary,
    },
}));
const NotFound: FunctionComponent = () => {
    return (
        <Wrapper center column>
            <h1>404</h1>
        </Wrapper>
    );
};

export default NotFound;
