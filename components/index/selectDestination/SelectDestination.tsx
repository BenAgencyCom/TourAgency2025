import { useState, useRef } from "react";
// Types
import type { FunctionComponent } from "react";
import type { TravelDestination } from "@/data/destinations";
// Components
import Slider from "react-slick";
import SingleDestination from "./SingleDestination";
// Material UI Components
import Box from "@mui/material/Box";
// Material UI Icons

// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styles
import styles from "@/sass/indexPage/indexPage.module.sass";

interface SelectDestinationParams {
    data: TravelDestination[];
    currentDestination: TravelDestination;
    selectDestination(id: number): void;
}

const SelectDestination: FunctionComponent<SelectDestinationParams> = ({ data, currentDestination, selectDestination }) => {
    const width = useAppSelector((state) => state.windowSizes.width);
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

        if (width > 1000) {
            const transformation = currentDestination.id - id;
            if ((currentDestination.id == 0 || currentDestination.id == data.length - 1) && Math.abs(transformation) == 1) return;
            sliderIndex -= transformation;

            slider.current?.slickGoTo(sliderIndex);
        } else {
            slider.current?.slickGoTo(currentDestination.id > id ? id - 1 : id);
        }
    };

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: width <= 1000 ? 2 : 3,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        vertical: width <= 650,
        draggable: false,
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", color: "#fff", userSelect: "none" }}>
            <Box className={styles.sliderWrap}>
                <Slider
                    {...settings} //
                    ref={slider}
                >
                    {data.map((target, index) => {
                        const alphaValue = target.id === currentDestination.id ? 0.6 : 0.1;
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
        </Box>
    );
};

export default SelectDestination;
