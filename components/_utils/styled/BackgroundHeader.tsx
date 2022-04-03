// Tools
import { styled, alpha } from "@mui/system";
// Styled components
export default styled("span")<{ fontSize?: string }>(({ theme, ...props }) => ({
    position: "absolute",
    letterSpacing: "10px",
    textTransform: "uppercase",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: props.fontSize ?? "10rem",
    color: alpha(theme.palette.text.primary, 0.1),
    userSelect: "none",
    zIndex: 0,
}));
