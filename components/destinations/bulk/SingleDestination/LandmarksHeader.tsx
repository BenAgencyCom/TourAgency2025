// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Styled Components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

const LandmarksHeader: FunctionComponent = () => {
    return (
        <Box sx={{ position: "relative", my: "20px" }}>
            <BackgroundHeader fontSize="3rem" sx={{ letterSpacing: "5px !important" }}>
                Landmarks
            </BackgroundHeader>
            <Typography variant="h4" sx={{ fontSize: "1.8rem", fontWeight: 700 }}>
                Places to discover
            </Typography>
        </Box>
    );
};

export default LandmarksHeader;
