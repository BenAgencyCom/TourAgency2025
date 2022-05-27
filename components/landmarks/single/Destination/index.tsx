// Tools
import RWD from "./RWD";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Destination as I_Destination } from "@/@types/pages/landmarks/SingleLandmark";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import ContinentMap from "./ContinentMap";
import Section from "@/components/_utils/Section";
import ReadMore from "@/components/_utils/ReadMore";
import DestinationPicture from "./DestinationPicture";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";
// Material UI Icons
import Map from "@mui/icons-material/Map";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const InformationWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "calc(40% - 20px)",
}));

const DestinationWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    ...(RWD as any),
}));

interface DestinationProps {
    destination: I_Destination;
}

const Destination: FunctionComponent<DestinationProps> = (props) => {
    const { city, country, folder, continent, shortDescription, slug } = props.destination;

    return (
        <Section
            header={{
                text: "Where is it located?",
                biggerHeader: "Destination",
            }}
            id="destination-wrapper"
            background="transparent"
            mobileIcon={<Map></Map>}
            sx={{
                mb: "200px",
                ["@media (max-width:800px)"]: {
                    mb: "0px",
                },
            }}
        >
            <DestinationWrapper>
                <DestinationPicture
                    city={city} //
                    country={country}
                    folder={folder}
                    resolution="480p"
                ></DestinationPicture>

                <InformationWrapper className="destination-information-wrapper">
                    <ContinentMap continent={continent}></ContinentMap>
                    <UnfadeOnScroll>
                        <FlexBox column horizontal="start">
                            <LocalizationBreadCrumbs crumbs={[continent, country, city]}></LocalizationBreadCrumbs>
                            <Typography variant="h2">{city}</Typography>
                            <Typography variant="body2">{shortDescription}</Typography>
                            <ReadMore url={`/destinations/${slug}`}></ReadMore>
                        </FlexBox>
                    </UnfadeOnScroll>
                </InformationWrapper>
            </DestinationWrapper>
        </Section>
    );
};

export default Destination;
