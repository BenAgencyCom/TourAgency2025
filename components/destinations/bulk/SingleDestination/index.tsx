// Tools
import { styled } from "@mui/system";
// Types
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import SingleLandmark from "./SingleLandmark";
import LandmarksHeader from "./LandmarksHeader";
import ReadMore from "@/components/_utils/ReadMore";
import DestinationPicture from "./DestinationPicture";
import FieldBackgroundMap from "@/components/_utils/FieldBackgroundMap";
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled(FlexBox)(({ theme }) => ({
    marginBottom: "60px",
    background: "#fff",
    borderRadius: "10px",
    boxSizing: "border-box",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    cursor: "default",
    ".single-destination-picture": {
        width: "calc(50% - 10px)",
    },
    ".single-destination-information": {
        width: "calc(50% - 10px)",
        position: "relative",
        zIndex: "1",
        ".background-map": {
            maxWidth: "500px",
            width: "100%",
            top: "-22%",
            right: "-8%",
            zIndex: -1,
        },
        ".landmarks-wrapper": {
            flexGrow: 1,
            width: "100%",
            mb: "20px",
        },
    },
    ["@media (max-width:1200px)"]: {
        ".single-destination-picture": {
            width: "calc(45% - 10px)",
        },
        ".single-destination-information": {
            width: "calc(55% - 10px)",
        },
    },
    ["@media (max-width:1000px)"]: {
        flexDirection: "column",
        padding: "0 0 10px 0",
        ".single-destination-picture": {
            width: "100%",
            borderRadius: "10px 10px 0 0",
        },
        ".single-destination-information": {
            padding: "0 10px",
            width: "100%",
            ".background-map": {
                top: "0",
                right: "0",
                height: "calc(100% - 200px)",
                maxWidth: "calc(100% - 100px)",
                zIndex: -1,
                opacity: 0.4,
                img: {
                    objectPosition: "120% 20px !important",
                },
            },
            ".single-landmark": {
                height: "200px",
            },
            "a.read-more": {
                marginTop: "50px",
                alignSelf: "center",
                width: "100%",
                maxWidth: "400px",
                button: {
                    height: "45px",
                    width: "100%",
                },
            },
        },
    },
    ["@media (max-width:800px)"]: {
        ".single-destination-information": {
            ".single-landmark": {
                height: "150px",
            },
        },
    },
    ["@media (max-width:700px)"]: {
        h2: {
            fontSize: "3rem",
        },
        ".single-destination-picture": {
            height: "350px",
        },
    },
    ["@media (max-width:600px)"]: {
        ".single-destination-picture": {
            height: "350px",
        },
    },
    ["@media (max-width:500px)"]: {
        ".single-destination-picture": {
            height: "300px",
        },
        ".single-destination-information": {
            ".landmarks-wrapper": {
                flexDirection: "column",
                ".single-landmark": {
                    width: "100%",
                    height: "280px",
                    marginBottom: "10px",
                },
            },
            "a.read-more": {
                marginTop: "20px",
            },
        },
    },
}));

interface SingleDestinationProps {
    destination: Destination;
}
const SingleDestination: FunctionComponent<SingleDestinationProps> = (props) => {
    const { continent, country, folder, city, shortDescription, slug, landmarks } = props.destination;
    const localization: string[] = [continent.replaceAll("_", " "), country];

    return (
        <Wrapper horizontal="between">
            <DestinationPicture
                picture={folder} //
                resolution="480p"
            ></DestinationPicture>
            <FlexBox column horizontal="start" className="single-destination-information">
                <FieldBackgroundMap continent={continent}></FieldBackgroundMap>
                <LocalizationBreadCrumbs crumbs={localization}></LocalizationBreadCrumbs>
                <Typography variant="h2">{city}</Typography>
                <Typography variant="body1">{shortDescription}</Typography>
                <LandmarksHeader></LandmarksHeader>

                <FlexBox horizontal="between" className="landmarks-wrapper">
                    {landmarks.map((item, index) => {
                        return <SingleLandmark url={item.picture} key={item.picture}></SingleLandmark>;
                    })}
                </FlexBox>
                <ReadMore url={`/destinations/${slug}`}></ReadMore>
            </FlexBox>
        </Wrapper>
    );
};

export default SingleDestination;
