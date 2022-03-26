// Tools
import colorTheme from "@/colorTheme";
// Types
import type { FunctionComponent } from "react";
// Other components
import Section from "@/components/destinations/single/_utils/Section";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
import SingleLandmark from "./single_landmark/SingleLandmark";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Landmarks: FunctionComponent = () => {
    const { landmarks, country } = useAppSelector((state) => state.singleDestination.data);
    return (
        <Section
            id="landmarks"
            background={colorTheme.palette.background.lightPaper}
            header={{
                text: "More similar venues to visit", //
                buttonMsg: `More in ${country}`,
                onClick: () => {},
                biggerHeader: "Landmarks",
            }}
            sx={{
                "&::before, &::after": {
                    content: "''",
                    position: "absolute",
                    left: 0,
                    background: colorTheme.palette.background.default,
                    width: "100%",
                    height: "60px",
                    zIndex: 3,
                    transform: "rotate(1deg)",
                },
                "&::before": {
                    top: -25,
                },
                "&::after": {
                    bottom: -25,
                },
            }}
        >
            <UnfadeOnScroll animationRatio={0.6} duration={700}>
                <FlexBox center>
                    {landmarks.map((item, index) => {
                        return (
                            <SingleLandmark
                                key={item.slug} //
                                data={item}
                                ml={index ? 20 : 0}
                            ></SingleLandmark>
                        );
                    })}
                </FlexBox>
            </UnfadeOnScroll>
        </Section>
    );
};

export default Landmarks;
