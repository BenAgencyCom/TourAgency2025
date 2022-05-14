// Tools
import { styled } from "@mui/system";
// Styled components
import ContentContainter from "@/components/_utils/styled/ContentContainter";
// RWD styles:
import landing from "./landing";
import landmarks from "./landmarks";
import general_stats from "./general_stats";

export default styled(ContentContainter)(({ theme }) => ({
    // Some general and frequently toggled properties
    margin: "0 !important",
    // RWD
    ...(landing as any),
    ...(landmarks as any),
    ...(general_stats as any),
}));
