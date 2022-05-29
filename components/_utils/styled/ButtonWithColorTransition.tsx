// Tools
import { styled } from "@mui/system";
// Tools
import type { ButtonBaseProps } from "@mui/material/ButtonBase";
// Material UI Components
import ButtonBase from "@mui/material/ButtonBase";

export interface ButtonWithColorTransitionProps extends ButtonBaseProps {
    primary?: boolean;
    reverse?: true;
    color?: string;
    background?: string;
}

const restrictedProperties = ["reverse", "primary"];

export default styled(ButtonBase, {
    shouldForwardProp: (propName: string) => {
        return !restrictedProperties.includes(propName);
    },
})<ButtonWithColorTransitionProps>(({ theme, ...props }) => {
    const { primary, reverse, color, background } = props;

    if (primary && color) throw new Error("Properties `primary` and `color` are interfering with each other!");

    const fontColor = primary ? theme.palette.primary.main : color ? color : theme.palette.text.primary;
    const backgroundColor = background ? background : "#fff";

    return {
        fontWeight: 300,
        padding: "3px 25px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "3px",
        transition: "color .2s linear, background-color .2s linear",
        ...(reverse
            ? {
                  border: `2px solid ${fontColor}`,
                  color: backgroundColor,
                  backgroundColor: fontColor,
                  "&:hover, &:focus": {
                      color: fontColor,
                      backgroundColor: backgroundColor,
                  },
              } //
            : {
                  border: `2px solid ${backgroundColor}`,
                  color: fontColor,
                  backgroundColor: backgroundColor,
                  "&:hover, &:focus": {
                      color: backgroundColor,
                      backgroundColor: fontColor,
                  },
              }),
    };
});
