// Tools
import { styled } from "@mui/system";
// Material UI Components
import Button from "@mui/material/Button";
// Styled components
export default styled(Button)(({ theme }) => ({
    fontSize: "1.3rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    svg: {
        fontSize: "2rem",
    },
}));
