// Tools
import { useRef, useEffect, useState } from "react";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

interface UnfadeOnScrollProps {
    children: ReactNode;
    sx?: Record<string, unknown>;
    animationRatio?: number;
    duration?: number;
}

const UnfadeOnScroll: FunctionComponent<UnfadeOnScrollProps> = (props) => {
    const { scrollY, height: windowInnerHeight } = useAppSelector((state) => state.windowSizes);
    const element = useRef<HTMLElement | null>(null);
    const [fade, setFade] = useState<boolean>(false);

    const animationRatio = props.animationRatio ?? 0.7;
    useEffect(() => {
        if (element.current) {
            const { top } = element.current.getBoundingClientRect();

            if (!fade && top < windowInnerHeight * animationRatio) setFade(true);
            else if ((fade && top > windowInnerHeight * animationRatio * 2) || scrollY === 0) setFade(false);
        }
    }, [scrollY, windowInnerHeight, fade, animationRatio]);

    return (
        <Fade in={fade}>
            <Box
                sx={{
                    ...props.sx,
                    ...{
                        transitionDuration: `${props.duration ?? 500}ms !important`,
                    },
                }}
                ref={element}
            >
                {props.children}
            </Box>
        </Fade>
    );
};

export default UnfadeOnScroll;
