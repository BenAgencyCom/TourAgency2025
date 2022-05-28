// Tools
import RWD from "./RWD";
// Types
import type { SxProps } from "@mui/system";

export default {
    position: "relative",
    width: "100%",
    marginBottom: "40px",
    padding: "20px",
    boxSizing: "border-box",
    borderRadius: 10,
    ...(RWD as any),
} as SxProps;
