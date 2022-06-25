// Tools
import { styled, keyframes } from "@mui/system";
// Styled components
const barKeyframes = keyframes({
    from: {
        transform: "scaleX(1)",
    },
    to: {
        transform: "scaleX(0)",
    },
});

export default styled("div")(({ theme }) => ({
    width: "100%",
    height: "100%",
    background: theme.palette.success.main,
    borderRadius: "3px",
    animation: `${barKeyframes} 3s .5s linear both`,
    transformOrigin: "left",
}));
