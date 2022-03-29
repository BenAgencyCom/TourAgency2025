// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// Other components
import Link from "next/link";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
// Material UI Icons
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
// Styled Components
import ButtonWithLineTransition from "@/components/_utils/styled/ButtonWithLineTransition";
const Header = styled(Typography)(({ theme }) => ({
    fontWeight: 900,
    userSelect: "none",
    position: "relative",
    "span.normal": {
        position: "relative",
        zIndex: 1,
        letterSpacing: "-2px",
        textTransform: "uppercase", //
    },
    "span.bigger": {
        position: "absolute",
        letterSpacing: "10px",
        textTransform: "uppercase", //
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "10rem",
        color: alpha(theme.palette.text.primary, 0.1),
    },
}));
const Wrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: "200px 0 100px 0",
}));
const ContinueButton = styled(ButtonWithLineTransition)(({ theme }) => ({
    padding: "10x 0",
    minWidth: "200px",
    fontSize: "1.1rem",
}));

interface SectionHeaderProps {
    header: string;
    buttonMsg?: string;
    biggerHeader?: string;
    onClick?: () => void;
    url?: string;
}
const SectionHeader: FunctionComponent<SectionHeaderProps> = (props) => {
    return (
        <UnfadeOnScroll duration={700}>
            <Wrapper>
                <Header variant="h2">
                    <span className="normal">{props.header}</span>
                    {props.biggerHeader && <span className="bigger">{props.biggerHeader}</span>}
                </Header>
                {(() => {
                    if (props.buttonMsg && props.url) {
                        return (
                            <ContinueButton reverse line="right">
                                <Link href={props.url} passHref>
                                    {props.buttonMsg}
                                </Link>
                            </ContinueButton>
                        );
                    } else if (props.buttonMsg && props.onClick) {
                        return (
                            <ContinueButton reverse line="right">
                                {props.buttonMsg}
                            </ContinueButton>
                        );
                    }
                })()}
            </Wrapper>
        </UnfadeOnScroll>
    );
};

export default SectionHeader;
