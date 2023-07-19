// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";
const HeaderWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    margin: "50px 0",
    ".bigger-header": {
        color: alpha("#fff", 0.1),
        fontSize: "7rem",
        letterSpacing: "2px",
        fontWeight: 900,
    },
    h3: {
        position: "relative",
        zIndex: 2,
        margin: 0,
    },
}));

const Header: FunctionComponent = () => {
    return (
        <HeaderWrapper className="footer-header">
            <BackgroundHeader className="bigger-header" sx={{ display: "block !important" }}>
                See also
            </BackgroundHeader>
            <h3 className="alternative-font-family">Tour Agency</h3>
        </HeaderWrapper>
    );
};

export default Header;
