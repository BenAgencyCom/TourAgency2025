import type { FunctionComponent } from "react";
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import colors from "@/sass/variables.module.sass";

const BottomSidePartialInfo: FunctionComponent<{ logo: ReactNode; children: ReactNode }> = ({ logo, children }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" sx={{ mr: 1, fontSize: "2rem" }} className={colors.mainFontColor}>
                {logo}
            </Typography>
            <Typography variant="h5" sx={{ color: "#fff", textAlign: "center" }}>
                {children}
            </Typography>
        </Box>
    );
};

export default BottomSidePartialInfo;
