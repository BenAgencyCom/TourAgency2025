// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Styled components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

const MainText = styled(Typography)(({ theme }) => ({
    marginTop: "30px",
    fontSize: "6rem",
    fontWeight: "900",
    letterSpacing: "-2px",
    position: "relative",
    "span.main-text": {
        position: "relative",
        zIndex: 2,
    },
    cursor: "default",
}));

interface HeaderProps {
    main: string;
    background: string;
}
const Header: FunctionComponent<HeaderProps> = (props) => {
    return (
        <MainText>
            <span className="main-text">{props.main}</span>
            <BackgroundHeader fontSize="8rem">{props.background}</BackgroundHeader>
        </MainText>
    );
};

export default Header;
