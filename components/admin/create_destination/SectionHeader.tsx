import type { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";

const SectionHeader: FunctionComponent<{ text: string }> = ({ text }) => {
    return (
        <Typography variant="h2" color="text.primary" sx={{ my: 3 }}>
            {text}
        </Typography>
    );
};

export default SectionHeader;
