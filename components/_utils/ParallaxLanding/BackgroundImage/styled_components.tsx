// Tools
import { styled, alpha } from "@mui/system";
// Material UI Components
import Box from "@mui/material/Box";

export const BackgroundImageWrapper = styled("div")({
    width: "100%",
    height: "100%",
    position: "relative",
    transitionDelay: "500ms !important",
    transitionDuration: "1000ms !important",
});
export const GradientMask = styled("div")({
    position: "absolute",
    zIndex: 1,
    top: 0,
    width: "100%",
    height: "100%",
    background: `linear-gradient(180deg, ${alpha("#121212", 0.1)} 0%, ${alpha("#121212", 0.2)} 41.46%, ${alpha("#121212", 0.627299)} 72.19%, #121212 100%)`,
    backdropFilter: "blur(5px)",
});
export const LoadingHiddingMask = styled("div")({
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    background: "#000",
    zIndex: -1,
});
export const ScrollingMask = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    background: theme.palette.background.paper,
    zIndex: 3,
    opacity: 0,
}));
