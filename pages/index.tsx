import type { FunctionComponent } from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import data from "@/data/destinations";
// Components
import IndexPageSlider from "@/components/index/backgroundImagesSlider/Slider";
import CurrentDestinationInfo from "@/components/index/currentDestinationInfo/CurrentDestinationInfo";
import SelectDestination from "@/components/index/selectDestination/SelectDestination";
import AboutDestination from "@/components/index/AboutDestination";

import styles from "@/sass/indexPage.module.sass";

const IndexPage: FunctionComponent<{}> = () => {
    const [currentDestinationIndex, setCurrentDestinationIndex] = useState<number>(1);
    const selectDestination = (id: number) => {
        setCurrentDestinationIndex(data.findIndex((target) => target.id === id));
    };
    const currentDestination = data[currentDestinationIndex];
    const [sidePanelsDistance, setSidePanelsDistance] = useState<number>(30);
    useEffect(() => {
        setSidePanelsDistance(
            (() => {
                const w = window.innerWidth;
                if (w > 2300) return 100;
                else return 30;
            })()
        );
    }, []);

    return (
        <Box sx={{ width: "100%", flexGrow: 1 }} className={styles.sliderWrapper}>
            <IndexPageSlider data={data} index={currentDestinationIndex}></IndexPageSlider>
            <CurrentDestinationInfo currentDestination={currentDestination}></CurrentDestinationInfo>
            <AboutDestination
                currentDestination={currentDestination} //
                sidePanelsDistance={sidePanelsDistance}
            ></AboutDestination>
            <SelectDestination
                data={data} //
                sidePanelsDistance={sidePanelsDistance}
                currentDestination={currentDestination}
                selectDestination={selectDestination}
            ></SelectDestination>
        </Box>
    );
};

export default IndexPage;
