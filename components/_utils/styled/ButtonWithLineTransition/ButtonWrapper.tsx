// Tools
import { styled } from "@mui/system";
import directionProperites from "./directionProperites";
// Types
import type { ButtonWrapperParams } from "./@types";
// Material UI Components
import ButtonBase from "@mui/material/ButtonBase";

const restrictedProperties = ["reverse", "primary"];

export default styled(ButtonBase, {
    shouldForwardProp: (propName: string) => {
        return !restrictedProperties.includes(propName);
    },
})<ButtonWrapperParams>(({ theme, ...props }) => {
    const { primary, reverse, color, background } = props;
    const direction = props.line ?? "left";

    if (primary && color) throw new Error("Properties `primary` and `color` are interfering with each other!");
    if (!["left", "right", "top", "bottom"].includes(direction)) throw new Error("Unexpected `direction` value!");

    const fontColor = primary ? theme.palette.primary.main : color ? color : theme.palette.text.primary;
    const backgroundColor = background ? background : "#fff";

    return {
        fontWeight: 300,
        padding: "3px 25px",
        position: "relative",
        transition: `color .2s linear .15s`,
        overflow: "hidden",
        borderRadius: "3px",
        ...(reverse
            ? {
                  border: `2px solid ${fontColor}`,
                  color: backgroundColor,
                  backgroundColor: fontColor,
                  "&:hover, &:focus": {
                      color: fontColor,
                      "span.bwlt-line": directionProperites[direction].hoverStyles,
                  },
              } //
            : {
                  border: `2px solid ${backgroundColor}`,
                  color: fontColor,
                  backgroundColor: backgroundColor,
                  "&:hover, &:focus": {
                      color: backgroundColor,
                      "span.bwlt-line": directionProperites[direction].hoverStyles,
                  },
              }),
        "span.bwlt-line": {
            position: "absolute",
            zIndex: 1,
            backgroundColor: reverse ? backgroundColor : fontColor,
            ...directionProperites[direction].defaultStyles,
        },
        "span.bwlt-text": {
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
        },
    };
});
