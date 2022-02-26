// Tools
import { styled } from "@mui/system";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import Slider from "react-slick";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Styled Components
const SliderWrapper = styled(Box)({
    "div.slick-slider": {
        paddingBottom: "50px",
    },
});
const Dots = styled(Box)(({ theme }) => ({
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center",
    position: "relative !important" as any,
    li: {
        width: "30px !important",
        height: "10px !important",
        background: theme.palette.text.primary,
        display: "flex !important",
        borderRadius: "3px",
        transition: "transform .1s, opacity .1s",
        opacity: 0.8,
        "&.slick-active": {
            transform: "scaleY(1.4)",
            opacity: 1,
        },
        "div.dot": {
            flexGrow: 1,
        },
    },
}));
interface BetterSliderProps {
    slidesPerRow?: number;
    children: ReactNode;
}
const BetterSlider: FunctionComponent<BetterSliderProps> = (props) => {
    return (
        <SliderWrapper>
            <Slider
                dots //
                arrows={false}
                infinite={false}
                speed={500}
                customPaging={(i) => {
                    return <div className="dot"></div>;
                }}
                appendDots={(dots) => {
                    return (
                        <Dots id="dots" component="ul">
                            {dots}
                        </Dots>
                    );
                }}
                slidesToShow={props.slidesPerRow ?? 1}
                slidesToScroll={1}
            >
                {props.children}
            </Slider>
        </SliderWrapper>
    );
};

export default BetterSlider;
