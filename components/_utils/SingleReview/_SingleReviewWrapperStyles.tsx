// Tools
import { alpha } from "@mui/system";
import RWD from "./RWD";
// Types
import type { SxProps } from "@mui/system";

export default {
    width: "100%",
    marginBottom: "40px",
    padding: "20px",
    boxSizing: "border-box",
    background: alpha("#fff", 0.3),
    borderRadius: 10,
    ...(RWD as any),
} as SxProps;
