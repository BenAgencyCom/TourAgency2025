// Tools
// Types
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/destinations/Reviews";
import type { PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Material UI Components
// Other components
import Header from "./Header";
import BreadcrumbsNavigation from "./BreadCrumbsNavigation";
import DestinationPicture from "./DestinationPicture";
import Stars from "./Stars";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface LandingProps {
    statistics: Statistics;
    pointsDistribution: PointsDistribution;
    destination: Destination;
}

const Landing: FunctionComponent<LandingProps> = (props) => {
    return (
        <FlexBox horizontal="between" sx={{ mt: "50px" }}>
            <FlexBox column>
                <BreadcrumbsNavigation destination={props.destination}></BreadcrumbsNavigation>
                <Header main={props.destination.city} background="Reviews"></Header>
                <Stars score={props.statistics.averageScore}></Stars>
            </FlexBox>
            <DestinationPicture picture={props.destination.folder}></DestinationPicture>
        </FlexBox>
    );
};

export default Landing;
