// Tools
import { useState } from "react";
import data from "@/data/destinations";
import styles from "@/sass/indexPage/indexPage.module.sass";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import Head from "next/head";
import IndexPageSlider from "@/components/index/backgroundImagesSlider/Slider";
import SelectDestination from "@/components/index/selectDestination/SelectDestination";
import CurrentDestinationInfo from "@/components/index/currentDestinationInfo/CurrentDestinationInfo";

const IndexPage: FunctionComponent<{}> = () => {
    const [currentDestinationIndex, setCurrentDestinationIndex] = useState<number>(1);
    const selectDestination = (id: number) => {
        setCurrentDestinationIndex(data.findIndex((target) => target.id === id));
    };
    const currentDestination = data[currentDestinationIndex];

    return (
        <>
            <Head>
                <title>MES | Welcome</title>
            </Head>
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
        </>
    );
};

export default IndexPage;
