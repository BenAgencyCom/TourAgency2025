// Tools
import theme from "@/colorTheme";
import { useState, useEffect } from "react";
import { styled, keyframes } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
// Styled components
const moveFromLeftToCenter = keyframes({
    from: {
        transform: "translateX(calc(-100% - 10px))",
    },
    to: {
        transform: "translateX(0%)",
    },
});
const moveFromRightToCenter = keyframes({
    from: {
        transform: "translateX(calc(100% + 10px))",
    },
    to: {
        transform: "translateX(0%)",
    },
});
const moveFromTopToCenter = keyframes({
    from: {
        transform: "translateY(calc(-100% - 10px))",
    },
    to: {
        transform: "translateY(0%)",
    },
});
const moveFromBottomToCenter = keyframes({
    from: {
        transform: "translateY(calc(100% + 10px))",
    },
    to: {
        transform: "translateY(0%)",
    },
});

const LineIntroAnimationBase = styled("span")(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
}));

const Line = styled("span")(({ theme }) => ({
    position: "absolute",
    zIndex: "2",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: theme.palette.text.primary,
}));

const ChildWrapper = styled("div")(({ theme }) => ({}));

type Direction = "left" | "top" | "right" | "bottom";
interface LineIntroAnimationProps {
    in: boolean;
    color?: "primary" | "text" | "background" | "paperDefault" | "paperLight";
    intro: Direction;
    outro: Direction;
    /** Expresed in **ms** */
    delay?: number;
    /** Expresed in **ms** */
    introDuration?: number;
    /** Expresed in **ms** */
    outroDuration?: number;
    /** Expresed in **ms** */
    timeBetweenAnimations?: number;
    // Optional
    sx?: SxProps;
}

const LineIntroAnimation: FunctionComponent<LineIntroAnimationProps> = (props) => {
    const [animation, setAnimation] = useState<string>("");
    const [showChildren, setShowChildren] = useState<boolean>(false);
    const [animationHasBeenShown, setAnimationHasBeenShown] = useState<boolean>(false);

    const getBackgroundColor = (color: LineIntroAnimationProps["color"]): string => {
        if (color === "background") return theme.palette.background.default;
        else if (color === "paperDefault") return theme.palette.background.paper;
        else if (color === "paperLight") return theme.palette.background.lightPaper;
        else if (color === "text") return theme.palette.text.primary;
        return theme.palette.primary.main;
    };

    const getKeyframeName = (direction: Direction): any => {
        if (direction === "left") return moveFromLeftToCenter;
        else if (direction === "right") return moveFromRightToCenter;
        else if (direction === "top") return moveFromTopToCenter;
        return moveFromBottomToCenter;
    };

    useEffect(() => {
        if (props.in === false || showChildren || animationHasBeenShown) return;
        let isMounted = true;

        const introAnimationDuration = props.introDuration ?? 200;
        const outroAnimationDuration = props.outroDuration ?? 200;
        const timeBetweenAnimations = props.timeBetweenAnimations ?? 400;
        const delay = props.delay ?? 0;

        setAnimation(`${getKeyframeName(props.intro)} ${introAnimationDuration}ms ${delay}ms linear both`);
        setTimeout(() => {
            if (isMounted) {
                setShowChildren(true);
                setAnimation(`${getKeyframeName(props.outro)} ${outroAnimationDuration}ms linear reverse both`);
                setTimeout(() => {
                    setAnimationHasBeenShown(true);
                }, outroAnimationDuration + 50);
            }
        }, introAnimationDuration + timeBetweenAnimations + delay);

        return () => {
            isMounted = false;
        };
    }, [props.in, props.intro, props.introDuration, props.outro, props.outroDuration, props.timeBetweenAnimations, props.delay, showChildren, animationHasBeenShown]);

    return (
        <LineIntroAnimationBase sx={props.sx} className="line-animation-wrapper">
            {!animationHasBeenShown && props.in && (
                <Line
                    sx={{
                        animation, //
                        background: getBackgroundColor(props.color ?? "text"),
                    }}
                    key={animation}
                />
            )}
            <ChildWrapper sx={{ visibility: showChildren ? "visible" : "hidden" }}>{props.children}</ChildWrapper>
        </LineIntroAnimationBase>
    );
};

export default LineIntroAnimation;
