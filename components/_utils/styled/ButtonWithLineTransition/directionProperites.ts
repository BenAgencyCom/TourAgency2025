import type { Direction } from "./@types";
export default {
    left: {
        defaultStyles: {
            width: "105%",
            height: "10%",
            transition: "transform .2s .2s linear, left .2s linear",
            top: "50%",
            left: "-60%",
            transform: "translate(-50%,-50%)",
        },
        hoverStyles: {
            left: "50%",
            transform: "translate(-50%,-50%) scaleY(13)",
        },
    },
    right: {
        defaultStyles: {
            width: "105%",
            height: "10%",
            transition: "transform .2s .2s linear, right .2s linear",
            top: "50%",
            right: "-60%",
            transform: "translate(50%,-50%)",
        },
        hoverStyles: {
            right: "50%",
            transform: "translate(50%,-50%) scaleY(13)",
        },
    },
    top: {
        defaultStyles: {
            width: "5%",
            height: "100%",
            transition: "width .2s .2s linear, top .2s linear",
            top: "-60%",
            right: "50%",
            transform: "translate(50%,-50%)",
        },
        hoverStyles: {
            top: "50%",
            width: "100%",
        },
    },
    bottom: {
        defaultStyles: {
            width: "5%",
            height: "100%",
            transition: "width .2s .2s linear, bottom .2s linear",
            bottom: "-60%",
            right: "50%",
            transform: "translate(50%,50%)",
        },
        hoverStyles: {
            bottom: "50%",
            width: "100%",
        },
    },
} as Record<Direction, { defaultStyles: Record<any, any>; hoverStyles: Record<any, any> }>;
