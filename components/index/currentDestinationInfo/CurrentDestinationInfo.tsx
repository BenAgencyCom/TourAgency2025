import type { FunctionComponent } from "react";
import type { TravelDestination } from "@/data/destinations";
import { useState, useEffect } from "react";
// My components
import BottomSidePartialInfo from "./BottomSidePartialInfo";
import BackgroundCountryName from "./BackgroundCountryName";
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
import styles from "@/sass/indexPage/indexPage.module.sass";
import colors from "@/sass/variables.module.sass";

const CurrentDestinationInfo: FunctionComponent<{ currentDestination: TravelDestination }> = ({ currentDestination }) => {
    const [triggerAnimations, setTriggerAnimations] = useState<number>(0);
    useEffect(() => {
        setTriggerAnimations((t) => t + 1);
    }, [currentDestination.id]);

    return (
        <Box className={styles.currentDestinationInfo}>
            {/* Country */}
            <BackgroundCountryName countryName={currentDestination.country} triggerAnimations={triggerAnimations}></BackgroundCountryName>
            {/* City */}
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
                    Reviews: <strong>{currentDestination.review.toFixed(2)}</strong>
                </BottomSidePartialInfo>{" "}
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }}></Divider>
                {/*  */}
                {/* PRICE */}
                {/*  */}
                <BottomSidePartialInfo logo={<Euro></Euro>}>
                    Starting at <strong>{currentDestination.price.toFixed(2)}</strong>{" "}
                </BottomSidePartialInfo>
            </Box>
            <Button variant="contained" sx={{ mt: 3, px: 5 }}>
                Book now
            </Button>
        </Box>
    );
};

export default CurrentDestinationInfo;
