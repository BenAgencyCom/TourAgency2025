// Tools
import { styled, alpha } from "@mui/system";
// Styled components
export default styled("div")(({ theme }) => ({
    width: "100%",
    flexGrow: "1",
    position: "relative",
    background: alpha(theme.palette.text.primary, 0.1),
    maxHeight: "calc(100vh - 500px)",
    height: "1px", // has to be here, otherwise image component will not render
    minHeight: "300px",
}));
