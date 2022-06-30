// Tools
import { styled, alpha } from "@mui/system";
// Styled components
export default styled("span")<{ fontSize?: string }>(({ theme, ...props }) => {
    const _convertIntoNumber = (font: string) => Number(font.split("rem")[0]);

    const _applyFontSize = (applyingFontSize: string): string => {
        if (props.fontSize) {
            return `${Math.min(_convertIntoNumber(applyingFontSize), _convertIntoNumber(props.fontSize))}rem`;
        } else return applyingFontSize;
    };

    return {
        position: "absolute",
        letterSpacing: "10px",
        textTransform: "uppercase",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: props.fontSize ?? "8rem",
        color: alpha(theme.palette.text.primary, 0.1),
        userSelect: "none",
        fontWeight: 900,
        zIndex: 0,
        ["@media (max-width:1500px)"]: {
            fontSize: _applyFontSize("6rem"),
            letterSpacing: "7px",
        },
        ["@media (max-width:1080px)"]: {
            fontSize: _applyFontSize("5.5rem"),
            letterSpacing: "6px",
        },
        ["@media (max-width:1000px)"]: {
            letterSpacing: "4px",
        },
        ["@media (max-width:800px)"]: {
            fontSize: _applyFontSize("5rem"),
        },
        ["@media (max-width:600px)"]: {
            letterSpacing: "0px",
            fontSize: _applyFontSize("4rem"),
        },
        ["@media (max-width:500px)"]: {
            display: "none",
        },
    };
});
