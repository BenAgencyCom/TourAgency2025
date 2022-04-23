// Tools
import { styled } from "@mui/system";
// Styled components
import ContentContainter from "@/components/_utils/styled/ContentContainter";
// RWD styles:
import landing from "./landing";
import landmarks from "./landmarks";
import description from "./description";
import general_stats from "./general_stats";
import left_side_stepper from "./left_side_stepper";

export default styled(ContentContainter)(({ theme }) => ({
    // Some general and frequently toggled properties
    margin: "0 !important",
    // RWD
    ...(landing as any),
    ...(landmarks as any),
    ...(description as any),
    ...(general_stats as any),
    ...(left_side_stepper as any),
}));
