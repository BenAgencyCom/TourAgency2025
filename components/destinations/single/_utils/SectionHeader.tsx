// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// Other components
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
// Material UI Icons
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
// Styled Components
const Header = styled(Typography)(({ theme }) => ({
    fontWeight: 900,
    letterSpacing: "-2px",
    textTransform: "uppercase",
    userSelect: "none",
}));
const Wrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: "200px 0 100px 0",
}));
const ContinueButton = styled(Button)(({ theme }) => ({
    padding: "10px",
    minWidth: "220px",
    boxSizing: "border-box",
    svg: {
        color: "inherit",
        fontSize: "1.5rem !important",
    },
}));

interface SectionHeaderProps {
    header: string;
    buttonMsg?: string;
    onClick?: () => void;
}
const SectionHeader: FunctionComponent<SectionHeaderProps> = (props) => {
    return (
        <UnfadeOnScroll duration={700}>
            <Wrapper>
                <Header variant="h2">{props.header}</Header>
                {(() => {
                    if (props.buttonMsg && props.onClick) {
                        return (
                            <ContinueButton
                                variant="contained" //
                                color="secondary"
                                endIcon={<ArrowRightAlt></ArrowRightAlt>}
                            >
                                More in poland
                            </ContinueButton>
                        );
                    }
                })()}
            </Wrapper>
        </UnfadeOnScroll>
    );
};

export default SectionHeader;
