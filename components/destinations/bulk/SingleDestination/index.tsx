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
}));

interface SingleDestinationProps {
    destination: Destination;
}
const SingleDestination: FunctionComponent<SingleDestinationProps> = (props) => {
    const { continent, country, folder, city, shortDescription, slug, landmarks } = props.destination;
    const localization: string[] = [continent.replaceAll("_", " "), country];

    return (
        <Wrapper horizontal="between">
            <FieldBackgroundMap continent={continent} sx={{ width: "35%", top: "-20%", right: "-3%" }}></FieldBackgroundMap>
            <DestinationPicture
                picture={folder} //
                resolution="480p"
                sx={{ width: "calc(50% - 10px)" }}
            ></DestinationPicture>
            <FlexBox column sx={{ width: "calc(50% - 10px)", position: "relative", zIndex: "1" }} horizontal="start">
                <LocalizationBreadCrumbs crumbs={localization}></LocalizationBreadCrumbs>
                <Typography variant="h2">{city}</Typography>
                <Typography variant="body1">{shortDescription}</Typography>
                <LandmarksHeader></LandmarksHeader>

                <FlexBox horizontal="between" sx={{ flexGrow: 1, width: "100%", mb: "20px" }}>
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
