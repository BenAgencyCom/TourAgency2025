// Tools
import { styled, alpha } from "@mui/system";
import { useState, useEffect, useRef } from "react";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Other components
import SectionHeader from "@/components/destinations/single/_utils/SectionHeader";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled Components
const Wrapper = styled(Box)({
    width: "100%",
    position: "relative",
    overflow: "hidden",
});
const Container = styled(Box)(({ theme }) => ({
    width: "100vw",
    maxWidth: theme.breakpoints.values.lg,
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
}));
const SecondBackground = styled(Box)(({ theme }) => ({
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transition: "background .5s , opacity 1s !important",
    backgroundSize: "cover",
    backgroundPosition: "center",
    "&::after": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backdropFilter: "blur(3px)",
        background: alpha("#121212", 0.9),
    },
}));

interface SectionProps {
    children: ReactNode;
    id: string;
    background: string;
    header: {
        text: string;
        buttonMsg: string;
        onClick: () => void;
    };
    // Optional
    fadeThresholdRatio?: number;
    // Second background
    displaySecondBackground?: boolean;
    secondBackground?: string;
}
const Section: FunctionComponent<SectionProps> = (props) => {
    const { scrollY, height } = useAppSelector((state) => state.windowSizes);
    const [fade, setFade] = useState<boolean>(true);
    const element = useRef<HTMLElement | null>(null);

    const fadeThresholdRatio = props.fadeThresholdRatio ?? 0.25;
    const fadeThreshold = height * fadeThresholdRatio;

    useEffect(() => {
        if (element.current) {
            const { bottom } = element.current.getBoundingClientRect();
            if (fade && bottom < fadeThreshold) setFade(false);
            else if (!fade && bottom > fadeThreshold) setFade(true);
        }
    }, [scrollY, fadeThreshold, fade]);

    return (
        <Wrapper
            id={props.id} //
            component="section"
            ref={element}
            sx={{ background: props.background }}
        >
            {(() => {
                if (props.displaySecondBackground !== undefined) {
                    return (
                        <Fade in={props.displaySecondBackground} timeout={1000}>
                            <SecondBackground sx={{ backgroundImage: props.secondBackground }}></SecondBackground>
                        </Fade>
                    );
                }
            })()}
            <Fade in={fade}>
                <Container>
                    <SectionHeader
                        header={props.header.text} //
                        buttonMsg={props.header.buttonMsg}
                        onClick={props.header.onClick}
                    ></SectionHeader>
                    {props.children}
                </Container>
            </Fade>
        </Wrapper>
    );
};

export default Section;
