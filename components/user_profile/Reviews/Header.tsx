// Tools
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
// Styled components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

const Wrapper = styled("div")(({ theme }) => ({
    position: "relative",
    marginBottom: "30px",
    h3: {
        margin: "0",
        fontSize: "4rem",
    },
}));

const Header: FunctionComponent<{ background: string; id?: string }> = (props) => {
    const [displayBackgroundHeader, setDisplayBackgroundHeader] = useState<boolean>(true);

    useEffect(() => {
        setDisplayBackgroundHeader(false);
        setTimeout(() => setDisplayBackgroundHeader(true), 100);
    }, [props.background]);

    return (
        <Wrapper id={props.id}>
            {(() => {
                if (displayBackgroundHeader) {
                    return (
                        <Fade in={true}>
                            <BackgroundHeader fontSize="6rem" sx={{ letterSpacing: "5px" }}>
                                {props.background}
                            </BackgroundHeader>
                        </Fade>
                    );
                }
            })()}
            <h3>{props.children}</h3>
        </Wrapper>
    );
};

export default Header;
