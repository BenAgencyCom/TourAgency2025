// Tools
import { styled } from "@mui/system";
// Material UI Components
import Box from "@mui/material/Box";

interface AbsoluteProps {
    // OP
    center?: true;
    fullSize?: true;
    // Styles
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    zIndex?: number;
}

export default styled(Box)<AbsoluteProps>(({ theme, ...props }) => {
    const { zIndex, left, right, top, bottom } = props;

    if (props.center && (top || left || bottom || right)) throw new Error("Parameter `center` has to be used stadealone without any of `left`, `right`, `top`, `bottom`");
    else if (left && right) throw new Error("Parameters `left` and `right` are interfering with each other.");
    else if (top && bottom) throw new Error("Parameters `top` and `bottom` are interfering with each other.");

    const horizontalPlacement = () => {
        if (left) return { left };
        else return { right };
    };
    const verticalPlacement = () => {
        if (top) return { top };
        else return { bottom };
    };

    return {
        "&>*": {
            position: "relative",
            zIndex: 2,
        },

        position: "absolute",
        zIndex: zIndex ?? 1,
        // Fullsize
        ...(props.fullSize
            ? {
                  width: "100%",
                  height: "100%",
              }
            : null),
        // Center
        ...(props.center
            ? {
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
              }
            : {
                  ...horizontalPlacement(),
                  ...verticalPlacement(),
              }),
    };
});
