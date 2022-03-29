// Tools
import { styled, alpha } from "@mui/system";
// Material UI Components
import Box from "@mui/material/Box";
// Styled components
export default styled(Box)<{ fontSize?: string }>(({ theme, ...props }) => ({
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
