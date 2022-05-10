// Tools
import { useRef, useEffect, useState, useMemo } from "react";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

interface UnfadeOnScrollProps {
    children: ReactNode;
    // Optional
    sx?: Record<string, unknown>;
    animationRatio?: number; // By default: 0.7
    duration?: number; // By default: 500
    stylesOnUnfold?: Record<string, unknown>;
}

const UnfadeOnScroll: FunctionComponent<UnfadeOnScrollProps> = (props) => {
    const { scrollY, height: windowInnerHeight } = useAppSelector((state) => state.windowSizes);
    const element = useRef<HTMLElement | null>(null);
    const [fade, setFade] = useState<boolean>(false);

    const animationRatio = props.animationRatio ?? 0.7;

    useEffect(() => {
        if (scrollY) {
            if (element.current && windowInnerHeight) {
                const { top } = element.current.getBoundingClientRect();
                if (!fade && top < windowInnerHeight * animationRatio) setFade(true);
                else if (fade && (top > windowInnerHeight * animationRatio * 2 || scrollY === 0)) setFade(false);
            }
        }
    }, [scrollY, windowInnerHeight, fade, animationRatio]);

    return useMemo(() => {
        return (
            <Fade in={fade}>
                <Box
                    sx={{
                        ...props.sx,
                        ...{
                            transitionDuration: `${props.duration ?? 500}ms !important`,
                        },
                        ...(fade && props.stylesOnUnfold),
                    }}
                    ref={element}
                >
                    {props.children}
                </Box>
            </Fade>
        );
    }, [fade, props.children, props.duration, props.stylesOnUnfold, props.sx]);
};

export default UnfadeOnScroll;
