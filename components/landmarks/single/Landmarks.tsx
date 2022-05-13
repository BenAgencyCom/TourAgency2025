// Tools
import colorTheme from "@/colorTheme";
// Types
import type { FunctionComponent } from "react";
import type { AdditionalLandmark } from "@/@types/pages/landmarks/SingleLandmark";
// Other components
import Section from "@/components/_utils/Section";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
import SingleLandmark from "@/components/_utils/SingleLandmark";
// Material UI Icons
import Map from "@mui/icons-material/Map";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface LandmarksProps {
    country: string;
    landmarks: AdditionalLandmark[];
}

const Landmarks: FunctionComponent<LandmarksProps> = (props) => {
    const { country, landmarks } = props;
    return (
        <Section
            id="similar-landmarks"
            background={colorTheme.palette.background.lightPaper}
            mobileIcon={<Map></Map>}
            header={{
                text: "Astonishing venues", //
                buttonMsg: `More in ${country}`,
                onClick: () => {},
                biggerHeader: "Landmarks",
            }}
            sx={{
                paddingBottom: "300px",
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
                <FlexBox center className="landmarks-wrapper">
                    {landmarks.map((item, index) => {
                        return (
                            <SingleLandmark
                                key={item.slug} //
                                data={item as any}
                                sx={{
                                    ml: index ? "20px" : 0,
                                }}
                            ></SingleLandmark>
                        );
                    })}
                </FlexBox>
            </UnfadeOnScroll>
        </Section>
    );
};

export default Landmarks;
