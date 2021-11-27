import type { FunctionComponent } from "react";
import { Typography, Box } from "@mui/material";
import TravelExplore from "@mui/icons-material/TravelExplore";
import styles from "@/sass/variables.module.sass";

const PageLogo: FunctionComponent<{}> = () => {
    return (
        <Box
            sx={{
                userSelect: "none", //
                display: "flex",
                alignItems: "center",
                letterSpacing: 1,
                m: 0,
                p: 0,
            }}
        >
            <TravelExplore sx={{ fontSize: "4rem" }} className={styles.mainFontColor}></TravelExplore>
            <Box
                sx={{
                    display: "flex", //
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                <Typography sx={{ m: 0, fontSize: "2rem" }}>Tamburyny.com</Typography>
                <Typography
                    sx={{
                        fontSize: ".7rem", //
                        opacity: 0.7,
                        letterSpacing: 2,
                    }}
                    className={styles.mainFontColor}
                >
                    remarkable and affordable travelling
                </Typography>
            </Box>
        </Box>
    );
};

export default PageLogo;
