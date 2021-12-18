import type { TravelDestination } from "@/data/destinations";
import type { FunctionComponent } from "react";

import { useEffect, useRef } from "react";
import Slider from "react-slick";
import Slide from "./Slide";

const IndexPageSlider: FunctionComponent<{ data: TravelDestination[]; index: number }> = ({ data, index }) => {
    const slider = useRef<null | Slider>(null);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        dots: false,
        draggable: false,
        arrows: false,
    };

    useEffect(() => {
        slider.current?.slickGoTo(index);
    }, [index]);
    return (
        <Slider {...settings} initialSlide={index} ref={slider}>
            {data.map((target, index) => {
                return <Slide destination={target} key={index} priority={index === 0}></Slide>;
            })}
        </Slider>
    );
};

export default IndexPageSlider;
