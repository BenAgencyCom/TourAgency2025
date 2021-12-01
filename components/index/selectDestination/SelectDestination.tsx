import type { FunctionComponent } from "react";
import type { TravelDestination } from "@/data/destinations";
import { useState, useRef } from "react";

import Slider from "react-slick";
import SingleDestination from "./SingleDestination";
import Box from "@mui/material/Box";

import styles from "@/sass/indexPage/indexPage.module.sass";

interface SelectDestinationParams {
    data: TravelDestination[];
    currentDestination: TravelDestination;
    selectDestination(id: number): void;
    sidePanelsDistance: number;
}

const SelectDestination: FunctionComponent<SelectDestinationParams> = ({ data, currentDestination, selectDestination, sidePanelsDistance }) => {
    const [blockSelection, setBlockSelection] = useState<boolean>(false);
    const slider = useRef<null | Slider>(null);
    let sliderIndex: number = 1;

    const handleOnClick = (id: number) => {
        if (blockSelection || id == currentDestination.id) return;
        setBlockSelection(true);
        selectDestination(id);
        setTimeout(() => {
            setBlockSelection(false);
        }, 500);

        const transformation = currentDestination.id - id;
        if ((currentDestination.id == 0 || currentDestination.id == data.length - 1) && Math.abs(transformation) == 1) return;
        sliderIndex -= transformation;

        slider.current?.slickGoTo(sliderIndex);
    };

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        vertical: true,
        arrows: false,
    };

    return (
        <Box sx={{ right: sidePanelsDistance }} className={styles.sidePanel}>
            <Slider
                {...settings} //
                ref={slider}
            >
                {data.map((target, index) => {
                    const alphaValue = target.id === currentDestination.id ? 0.7 : 0.1;
                    return (
                        <SingleDestination
                            key={index} //
                            handleOnClick={handleOnClick}
                            target={target}
                            alphaValue={alphaValue}
                        ></SingleDestination>
                    );
                })}
            </Slider>
        </Box>
    );
};

export default SelectDestination;
