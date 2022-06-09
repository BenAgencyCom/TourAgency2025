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

export const lineIntroFromLeft = keyframes({
    "0%": {
        "&:after": {
            content: "''",
            position: "absolute",
            top: "0",
            left: "0",
            width: "0%",
            height: "100%",
            background: "red",
        },
    },
    "50%%": {
        "&:after": {
            width: "100%",
        },
    },
    "100%": {
        "&:after": {
            width: "0%",
        },
    },
});
