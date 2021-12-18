import type { FunctionComponent } from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import data from "@/data/destinations";
// Components
import IndexPageSlider from "@/components/index/backgroundImagesSlider/Slider";
import CurrentDestinationInfo from "@/components/index/currentDestinationInfo/CurrentDestinationInfo";
import SelectDestination from "@/components/index/selectDestination/SelectDestination";
// Redux
import { useAppSelector } from "@/redux/hooks";
import styles from "@/sass/indexPage/indexPage.module.sass";

const IndexPage: FunctionComponent<{}> = () => {
    const [currentDestinationIndex, setCurrentDestinationIndex] = useState<number>(1);
    const selectDestination = (id: number) => {
        setCurrentDestinationIndex(data.findIndex((target) => target.id === id));
    };
    const currentDestination = data[currentDestinationIndex];

    return (
        <Box sx={{ width: "100%", flexGrow: 1 }} className={styles.sliderWrapper}>
            <IndexPageSlider data={data} index={currentDestinationIndex}></IndexPageSlider>
            <Box className={styles.contentWrapper}>
                <CurrentDestinationInfo currentDestination={currentDestination}></CurrentDestinationInfo>
                <SelectDestination
                    data={data} //
                    currentDestination={currentDestination}
                    selectDestination={selectDestination}
                ></SelectDestination>
            </Box>
        </Box>
    );
};

export default IndexPage;
