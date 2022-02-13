// Tools
import { useState } from "react";
// Types
import type { LandmarkPictureResolution } from "@/@types/pages/SingleDestination";
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
    const [slidesPerRow, setSlidesPerRow] = useState<number>(2);
    const [hoveringPicture, _setHoveringPicture] = useState<string>("");
    const [useHoveringPictureAsBackground, setUseHoveringPictureAsBackground] = useState<boolean>(false);

    const setHoveringPicture = (picture: string | null) => {
        if (!picture) setUseHoveringPictureAsBackground(false);
        else {
            setUseHoveringPictureAsBackground(true);
            _setHoveringPicture(`url(${picture})`);
        }
    };
    const createImagePath = (picture: string, resolution: LandmarkPictureResolution): string => {
        return `/upload/landmarks/${picture}/${resolution}.jpg`;
    };

    return (
        <Section
            id="description"
            background={`#121212`}
            header={{
                text: "Beauties to discover", //
                buttonMsg: `More in ${country}`,
                onClick: () => {},
            }}
            secondBackground={hoveringPicture}
            displaySecondBackground={useHoveringPictureAsBackground}
        >
            <UnfadeOnScroll animationRatio={0.6} duration={700}>
                <Slider slidesPerRow={slidesPerRow}>
                    {landmarks.map((item) => {
                        return (
                            <SingleLandmark
                                key={item.slug} //
                                data={item}
                                createImagePath={(resolution: LandmarkPictureResolution) => createImagePath(item.picture, resolution)}
                                onMouseEnter={() => setHoveringPicture(createImagePath(item.picture, "1080p"))}
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
