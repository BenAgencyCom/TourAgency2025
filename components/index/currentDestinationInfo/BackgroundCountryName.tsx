import type { FunctionComponent } from "react";
import { useState, useEffect } from "react";
import styles from "@/sass/indexPage/backgroundCoutryName.module.sass";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

import { useAppSelector } from "@/hooks/useRedux";

interface BackgroundCountryNameParams {
    countryName: string;
    triggerAnimations: number;
}

const BackgroundCountryName: FunctionComponent<BackgroundCountryNameParams> = ({ countryName, triggerAnimations }) => {
    const width = useAppSelector((state) => state.windowSizes.width);
    const top = countryName.length > 15 ? "10%" : "0%";
    const [fontSize, setFontSize] = useState<number>(countryName.length > 15 ? 10 : 15);

    useEffect(() => {
        const _setFontSize = (forCommonNames: number, forBiggerNames: number) => setFontSize(countryName.length > 15 ? forBiggerNames : forCommonNames);
        if (width > 1500) _setFontSize(15, 10);
        else if (width > 1200) _setFontSize(14, 8);
        else if (width > 800) _setFontSize(12, 7);
    }, [width, countryName.length]);

    return (
        <Box className={styles.wrapper} sx={{ top }}>
            <Fade key={triggerAnimations} in={true} timeout={1500}>
                <Typography className={styles.typhography} sx={{ fontSize: `${fontSize}rem` }} component="span">
                    {countryName}
                </Typography>
            </Fade>
        </Box>
    );
};

export default BackgroundCountryName;
