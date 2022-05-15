// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Styled components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

const Wrapper = styled("div")(({ theme }) => ({
    position: "relative",
    marginBottom: "30px",
}));

const Header: FunctionComponent = (props) => {
    return (
        <Wrapper>
            <BackgroundHeader fontSize="8rem">reviewer</BackgroundHeader>
            <Typography variant="h1">{props.children}</Typography>
        </Wrapper>
    );
};

export default Header;
