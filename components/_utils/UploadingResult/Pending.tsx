// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const Pending: FunctionComponent = () => {
    return (
        <Fade in={true}>
            <div className="result-content">
                <CircularProgress />
                <Typography variant="body1">Your request is processing...</Typography>
            </div>
        </Fade>
    );
};

export default Pending;
