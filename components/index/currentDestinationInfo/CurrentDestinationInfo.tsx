// Tools
import { useState, useEffect } from "react";
import useWindowSizes from "@/hooks/useWindowSizes";
// Types
import type { FunctionComponent } from "react";
import type { TravelDestination } from "@/data/destinations";
// Other components
import BottomSidePartialInfo from "./BottomSidePartialInfo";
import BackgroundCountryName from "./BackgroundCountryName";
// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
// Material UI Icons
import AccessTime from "@mui/icons-material/AccessTime";
import StarBorder from "@mui/icons-material/StarBorder";
import Star from "@mui/icons-material/Star";
import Euro from "@mui/icons-material/Euro";
// Styles
import styles from "@/sass/indexPage/indexPage.module.sass";

const CurrentDestinationInfo: FunctionComponent<{ currentDestination: TravelDestination }> = ({ currentDestination }) => {
    const { width } = useWindowSizes();
    const [triggerAnimations, setTriggerAnimations] = useState<number>(0);
    useEffect(() => {
        setTriggerAnimations((t) => t + 1);
    }, [currentDestination.id]);

    return (
        <Box className={styles.currentDestinationInfo}>
            {/* Country */}
            {(() => {
                if (width > 650) {
                    return <BackgroundCountryName countryName={currentDestination.country} triggerAnimations={triggerAnimations}></BackgroundCountryName>;
                }
            })()}

            {/* City */}
            <Typography variant="h4" sx={{ color: "primary.main" }} className={styles["city-header"]}>
                {currentDestination.city}
            </Typography>
            {/* Description */}
            <Typography variant="h2" className={styles["description-header"]}>
                {currentDestination.description}
            </Typography>
            <Box className={styles["adventages-list"]}>
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
                <Divider orientation="vertical" flexItem sx={{ mx: 2, mb: 1 }}></Divider>
                <BottomSidePartialInfo logo={<StarBorder></StarBorder>}>
                    Reviews:{" "}
                    <Rating
                        value={Number(currentDestination.review.toFixed(2))} //
                        readOnly={true}
                        precision={0.5}
                        sx={{ ml: 1 }}
                        icon={<Star sx={{ color: "primary.main" }}></Star>}
                    ></Rating>
                </BottomSidePartialInfo>{" "}
                <Divider orientation="vertical" flexItem sx={{ mx: 2, mb: 1 }}></Divider>
                {/*  */}
                {/* PRICE */}
                {/*  */}
                <BottomSidePartialInfo logo={<Euro></Euro>}>
                    Starting at €<strong>{currentDestination.price.toFixed(2)}</strong>{" "}
                </BottomSidePartialInfo>
            </Box>
            <Button variant="contained" sx={{ mt: 3, px: 5 }} className={styles.bookNow}>
                Book now
            </Button>
        </Box>
    );
};

export default CurrentDestinationInfo;
