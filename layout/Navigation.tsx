import type { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Navigation: FunctionComponent<{ buttonStyles: Record<string, unknown> }> = ({ buttonStyles }) => {
    return (
        <Box
            sx={{
                display: "flex", //
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
                mr: 2,
            }}
        >
            <Button sx={buttonStyles} variant="outlined">
                Lorem
            </Button>
            <Button sx={buttonStyles} variant="outlined">
                Ipsum
            </Button>
            <Button sx={buttonStyles} variant="outlined">
                Gorzen
            </Button>
        </Box>
    );
};

export default Navigation;
