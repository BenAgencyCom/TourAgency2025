// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

const Wrapper = styled("div")(({ theme }) => ({
    position: "relative",
    marginBottom: "30px",
    h3: {
        margin: "0",
        fontSize: "5rem",
    },
}));

const Header: FunctionComponent = (props) => {
    return (
        <Wrapper>
            <BackgroundHeader fontSize="8rem">reviewer</BackgroundHeader>
            <h3>{props.children}</h3>
        </Wrapper>
    );
};

export default Header;
