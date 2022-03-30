// Types
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/destinations/Reviews";
import type { PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Other components
import Stars from "./Stars";
import Header from "./Header";
import DestinationPicture from "./DestinationPicture";
import BreadcrumbsNavigation from "./BreadCrumbsNavigation";
import PointsDistributionComponent from "./PointsDistribution";
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

                <PointsDistributionComponent
                    statistics={props.statistics} //
                    pointsDistribution={props.pointsDistribution}
                ></PointsDistributionComponent>
            </FlexBox>
            <DestinationPicture picture={props.destination.folder}></DestinationPicture>
        </FlexBox>
    );
};

export default Landing;
