// Tools
import { useState } from "react";
import colorTheme from "@/colorTheme";
import { landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Other components
import Section from "@/components/destinations/single/_utils/Section";
import Slider from "@/components/_utils/Slider";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
import SingleLandmark from "./single_landmark/SingleLandmark";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

const Landmarks: FunctionComponent = () => {
    const { landmarks, country } = useAppSelector((state) => state.singleDestination.data);
    const [slidesPerRow, setSlidesPerRow] = useState<number>(3);
    const [hoveringPicture, _setHoveringPicture] = useState<string>("");
    const [useHoveringPictureAsBackground, setUseHoveringPictureAsBackground] = useState<boolean>(false);

    const setHoveringPicture = (picture: string | null) => {
        if (!picture) setUseHoveringPictureAsBackground(false);
        else {
            setUseHoveringPictureAsBackground(true);
            _setHoveringPicture(`url(${picture})`);
        }
    };

    return (
        <Section
            id="landmarks"
            background={colorTheme.palette.background.paper}
            header={{
                text: "Beauties to discover", //
                buttonMsg: `More in ${country}`,
                onClick: () => {},
            }}
            secondBackground={hoveringPicture}
            displaySecondBackground={useHoveringPictureAsBackground}
            sx={{
                "&::before": {
                    content: "''",
                    position: "absolute",
                    top: -25,
                    left: 0,
                    transform: "rotate(1deg)",
                    background: colorTheme.palette.background.default,
                    width: "100%",
                    height: "60px",
                    zIndex: 3,
                },
                "&::after": {
                    content: "''",
                    position: "absolute",
                    bottom: -25,
                    left: 0,
                    transform: "rotate(1deg)",
                    background: colorTheme.palette.background.default,
                    width: "100%",
                    height: "60px",
                    zIndex: 3,
                },
            }}
        >
            <UnfadeOnScroll animationRatio={0.6} duration={700}>
                <Slider slidesPerRow={slidesPerRow}>
                    {landmarks.map((item) => {
                        return (
                            <SingleLandmark
                                key={item.slug} //
                                data={item}
                                onMouseEnter={() => setHoveringPicture(landmarkPictureURL(item.picture, "1080p"))}
                                onMouseLeave={() => setHoveringPicture(null)}
                            ></SingleLandmark>
                        );
                    })}
                </Slider>
            </UnfadeOnScroll>
        </Section>
    );
};

export default Landmarks;
