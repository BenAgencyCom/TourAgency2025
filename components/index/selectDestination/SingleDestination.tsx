import type { FunctionComponent } from "react";
import type { TravelDestination } from "@/data/destinations";

import { alpha } from "@mui/system";
// Material components
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
// Material icons
import LocationOn from "@mui/icons-material/LocationOn";
// Styles
import colors from "@/sass/variables.module.sass";
import styles from "@/sass/indexPage/indexPage.module.sass";

interface SingleDestinationParams {
    target: TravelDestination;
    alphaValue: number;
    handleOnClick(id: number): void;
}
const SingleDestination: FunctionComponent<SingleDestinationParams> = ({ target, alphaValue, handleOnClick }) => {
    return (
        <Box sx={{ px: "10px" }}>
            <CardActionArea
                className={styles.selectDestinationSingleItem} //
                sx={{
                    backgroundColor: (theme) => alpha(theme.palette.neutral.main, alphaValue),
                }}
                onClick={() => handleOnClick(target.id)}
            >
                <Avatar src={target.backgroundSrc} alt="avatar" sx={{ width: 50, height: 50, mr: 2 }}></Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6">{target.city}</Typography>
                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOn className={colors.mainFontColor}></LocationOn>
                        <span>
                            {target.continent}, {target.country}
                        </span>
                    </Typography>
                </Box>
            </CardActionArea>
        </Box>
    );
};

export default SingleDestination;
