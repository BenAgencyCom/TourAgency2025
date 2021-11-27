import type { FunctionComponent } from "react";
import type { TravelDestination } from "@/data/destinations";
// My components
import BottomSidePartialInfo from "./BottomSidePartialInfo";
// Material Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
// Material Icons
import AccessTime from "@mui/icons-material/AccessTime";
import StarBorder from "@mui/icons-material/StarBorder";
import Euro from "@mui/icons-material/Euro";
// Styles
import styles from "@/sass/indexPage.module.sass";
import colors from "@/sass/variables.module.sass";

const CurrentDestinationInfo: FunctionComponent<{ currentDestination: TravelDestination }> = ({ currentDestination }) => {
    const backgroundTextSize = currentDestination.country.length > 15 ? 10 : 15;
    const top = currentDestination.country.length > 15 ? "50%" : "30%";
    return (
        <Box className={styles.currentDestinationInfo}>
            <Typography className={styles.currentDestinationInfoCountry} sx={{ fontSize: `${backgroundTextSize}rem`, top }} component="span">
                {currentDestination.country}
            </Typography>
            {/* Country */}
            <Typography variant="h4" className={colors.mainFontColor}>
                {currentDestination.city}
            </Typography>
            {/* Description */}
            <Typography variant="h2" sx={{ color: "#fff", textAlign: "center", my: 3 }}>
                {currentDestination.description}
            </Typography>
            <Box sx={{ display: "flex" }}>
                {/*  */}
                {/* DURATION */}
                {/*  */}
                <BottomSidePartialInfo logo={<AccessTime></AccessTime>}>
                    <span>
                        <strong>{currentDestination.length.days}</strong> days,{" "}
                    </span>
                    <span>
                        <strong>{currentDestination.length.nights}</strong> nights
                    </span>
                </BottomSidePartialInfo>
                {/*  */}
                {/* REVIEWS */}
                {/*  */}
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }}></Divider>
                <BottomSidePartialInfo logo={<StarBorder></StarBorder>}>
                    Reviews: <strong>{currentDestination.review}</strong>
                </BottomSidePartialInfo>{" "}
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }}></Divider>
                {/*  */}
                {/* PRICE */}
                {/*  */}
                <BottomSidePartialInfo logo={<Euro></Euro>}>
                    Starting at <strong>{currentDestination.price}</strong>{" "}
                </BottomSidePartialInfo>
            </Box>
            <Button variant="contained" sx={{ mt: 3, px: 5 }}>
                Book now
            </Button>
        </Box>
    );
};

export default CurrentDestinationInfo;
