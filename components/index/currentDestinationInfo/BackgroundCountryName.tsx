import type { FunctionComponent } from "react";
import styles from "@/sass/indexPage/backgroundCoutryName.module.sass";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

interface BackgroundCountryNameParams {
    countryName: string;
    triggerAnimations: number;
}

const BackgroundCountryName: FunctionComponent<BackgroundCountryNameParams> = ({ countryName, triggerAnimations }) => {
    const backgroundTextSize = countryName.length > 15 ? 10 : 15;
    const top = countryName.length > 15 ? "50%" : "30%";

    return (
        <Box className={styles.wrapper}>
            <Fade key={triggerAnimations} in={true} timeout={1500}>
                <Typography className={styles.typhography} sx={{ fontSize: `${backgroundTextSize}rem`, top }} component="span">
                    {countryName}
                </Typography>
            </Fade>
        </Box>
    );
};

export default BackgroundCountryName;
