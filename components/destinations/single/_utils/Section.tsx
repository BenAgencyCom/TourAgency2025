// Tools
import { styled } from "@mui/system";
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
});
const Container = styled(Box)(({ theme }) => ({
    width: "100vw",
    maxWidth: theme.breakpoints.values.lg,
    margin: "0 auto",
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
    fadeThresholdRatio?: number;
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
