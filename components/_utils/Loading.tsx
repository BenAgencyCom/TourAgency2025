import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = styled(CircularProgress)(() => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}));

export default Loading;
