// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

const Header = styled("h1")(({ theme }) => ({
    position: "relative",
    margin: "60px 0 ",
    fontSize: "4rem",
    fontWeight: 900,
}));

const LandingHeader: FunctionComponent = () => (
    <Header>
        <BackgroundHeader fontSize="8rem">Destinations</BackgroundHeader>
        <span>Explore the diversity of the World</span>
    </Header>
);
export default LandingHeader;
