import { keyframes } from "@mui/system";

export const KeyframeScaleX = keyframes({
    from: {
        transform: "scaleX(0)",
    },
    to: {
        transform: "scaleX(1)",
    },
});

export const fadeIn = keyframes({
    from: {
        opacity: 0,
        visibility: "hidden",
    },
    to: {
        opacity: 1,
        visibility: "visible",
    },
});
