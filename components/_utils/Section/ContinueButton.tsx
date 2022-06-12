// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
// Other components
import Link from "next/link";
// Styled Components
import ButtonWithLineTransition from "@/components/_utils/styled/ButtonWithLineTransition";

const StyledButton = styled(ButtonWithLineTransition)(({ theme }) => ({
    padding: "10px 40px",
    minWidth: "200px",
    fontSize: "1.1rem",
}));

interface SectionHeaderProps {
    buttonMsg: string;
    onClick?: () => void;
    url?: string;
    sx?: SxProps;
}

const ContinueButton: FunctionComponent<SectionHeaderProps> = (props) => {
    const { buttonMsg, onClick, url, sx } = props;

    if (url) {
        return (
            <Link href={url} passHref>
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <StyledButton reverse line="right" sx={sx}>
                        {buttonMsg}
                    </StyledButton>
                </span>
            </Link>
        );
    }

    return (
        <StyledButton reverse line="right" onClick={onClick} sx={sx}>
            {buttonMsg}
        </StyledButton>
    );
};

export default ContinueButton;
