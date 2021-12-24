// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
// Material UI Icons
import Apartment from "@mui/icons-material/Apartment";

interface ThereAreNoLandmarksProps {
    addNewLandmark: () => void;
}

const ThereAreNoLandmarks: FunctionComponent<ThereAreNoLandmarksProps> = (props) => {
    return (
        <Fade in={true}>
            <Box
                sx={{
                    display: "flex", //
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    pb: "100px",
                }}
            >
                <Apartment sx={{ color: "text.primary", fontSize: "10rem" }}></Apartment>
                <Typography variant="h3" sx={{ textAlign: "center", color: "text.primary" }}>
                    There are currently no landmarks
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={props.addNewLandmark}>
                    Add a new landmark
                </Button>
            </Box>
        </Fade>
    );
};

export default ThereAreNoLandmarks;
