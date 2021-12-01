import type { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import { TravelDestination } from "@/data/destinations";

import indexPageStyles from "@/sass/indexPage/indexPage.module.sass";

const Slide: FunctionComponent<{ destination: TravelDestination }> = ({ destination }) => {
    return (
        <Box
            sx={{ backgroundImage: `url(${destination.backgroundSrc})` }} //
            className={indexPageStyles.sliderItem}
        ></Box>
    );
};

export default Slide;
