// Types
import type { FunctionComponent, ReactNode, MutableRefObject } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
// Other components
import Slider from "react-slick";
import ThereAreNoLandmarks from "./TheraAreNoLandmarks";
// Styles
import styles from "@/sass/admin/create_destination.module.sass";

interface WrapperProps {
    thereAreNoLandmarks: boolean;
    children: ReactNode[];
    hideNavigation: boolean;
    swapper: MutableRefObject<Slider | null>;
    addNewLandmark: () => void;
}

const Wrapper: FunctionComponent<WrapperProps> = (props) => {
    const settings = {
        accessibility: false,
        dots: false,
        arrows: false,
        infinite: false,
        draggable: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <Box
            className={styles["landmarks-wrapper"]}
            sx={{
                transition: "margin-top .3",
                ".slick-slider": {
                    height: "100% !important",
                    ".slick-list": {
                        height: "100% !important",
                        ".slick-track": {
                            height: "100% !important",
                            ".slick-slide": {
                                height: "100% !important",
                                ">div": {
                                    height: "100% !important",
                                },
                            },
                        },
                    },
                },
            }}
        >
            {(() => {
                if (!props.thereAreNoLandmarks) {
                    return (
                        <Slider {...settings} ref={props.swapper}>
                            {props.children}
                        </Slider>
                    );
                } else {
                    return (
                        <ThereAreNoLandmarks
                            addNewLandmark={props.addNewLandmark} //
                        ></ThereAreNoLandmarks>
                    );
                }
            })()}
        </Box>
    );
};

export default Wrapper;
