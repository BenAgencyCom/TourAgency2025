// Tools
import { styled } from "@mui/system";
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

const Wrapper = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ["@media (max-width:1200px)"]: {
        flexDirection: "column",
    },
    ["@media (max-width:1700px) and (min-width:1000px)"]: {
        ".single-landmark-picture": {
            height: "230px",
        },
    },
    ["@media (max-width:1200px) and (min-width:1000px)"]: {
        "div.single-landmark": {
            width: "100%",
            margin: "60px 0 0 0",
            height: "auto",
            "&:nth-of-type(1)": {
                marginTop: "0px",
            },
            "div.single-landmark-picture": {
                height: "500px",
            },
            h3: {
                fontSize: "3rem",
                margin: "10px 0 20px 0",
            },
        },
    },
}));

interface LandmarksProps {
    relatedPlace: string;
    landmarks: AdditionalLandmark[];
    header: {
        text: string;
    };
    id: string;
}

const Landmarks: FunctionComponent<LandmarksProps> = (props) => {
    const { relatedPlace, landmarks, id } = props;
    return (
        <Section
            id={props.id}
            background={colorTheme.palette.background.lightPaper}
            mobileIcon={<Map></Map>}
            header={{
                text: props.header.text, //
                buttonMsg: `More in ${relatedPlace}`,
                biggerHeader: "Landmarks",
                url: `/landmarks?searchingPhrase=${relatedPlace}`,
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
            <UnfadeOnScroll>
                <Wrapper className="landmarks-wrapper">
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
                </Wrapper>
            </UnfadeOnScroll>
        </Section>
    );
};

export default Landmarks;
