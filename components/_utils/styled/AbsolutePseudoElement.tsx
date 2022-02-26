// Tools
import { styled } from "@mui/system";
// Material UI Components
import Box from "@mui/material/Box";

interface AbsolutePseudoElementProps {
    // PseudoElement only
    pseudoElement: "before" | "after";
    background?: string;
    uponFullSize?: string;
    /**
     * In degrees
     */
    rotate?: number;
    // OP
    center?: true;
    fullSize?: true;
    // Styles
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
}

export default styled(Box)<AbsolutePseudoElementProps>(({ theme, ...props }) => {
    const { left, right, top, bottom, uponFullSize } = props;

    if (props.center && (top || left || bottom || right)) throw new Error("Parameter `center` has to be used stadealone without any of `left`, `right`, `top`, `bottom`");
    else if (left && right) throw new Error("Parameters `left` and `right` are interfering with each other.");
    else if (top && bottom) throw new Error("Parameters `top` and `bottom` are interfering with each other.");
    else if (uponFullSize && props.fullSize) throw new Error("Parameters `uponFullSize` and `fullSize` are interfering with each other.");

    const horizontalPlacement = () => {
        if (left) return { left };
        else return { right };
    };
    const verticalPlacement = () => {
        if (top) return { top };
        else return { bottom };
    };

    const sizing = () => {
        if (uponFullSize) {
            return {
                width: `calc(100% + ${uponFullSize})`,
                height: `calc(100% + ${uponFullSize})`,
            };
        } else if (props.fullSize) {
            return {
                width: "100%",
                height: "100%",
            };
        } else return null;
    };

    const centering = () => {
        if (props.center)
            return {
                top: "50%",
                left: "50%",
                transformOrigin: "left top",
            };
        else
            return {
                ...horizontalPlacement(),
                ...verticalPlacement(),
            };
    };

    const transforming = () => {
        let transform: string = "";
        if (props.rotate) transform += `rotate(${props.rotate}deg) `;
        if (props.center) transform += "translate(-50%,-50%)";
        return { transform };
    };

    return {
        "&>*": {
            position: "relative",
            zIndex: 2,
        },
        [`&::${props.pseudoElement}`]: {
            content: "''",
            position: "absolute",
            background: props.background,
            ...sizing(),
            ...centering(),
            ...transforming(),
        },
    };
});
