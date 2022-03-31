// Tools
import { styled } from "@mui/system";
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
import MoreInformation from "./MoreInformation";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const LeftSideContent = styled(FlexBox)(({ theme }) => ({
    paddingRight: "100px",
    flexGrow: 1,
}));

interface LandingProps {
    statistics: Statistics;
    pointsDistribution: PointsDistribution;
    destination: Destination;
}

const Landing: FunctionComponent<LandingProps> = (props) => {
    return (
        <FlexBox horizontal="between" sx={{ mt: "50px", flexGrow: 1 }}>
            <LeftSideContent column vertical="evenly">
                <FlexBox column>
                    <BreadcrumbsNavigation destination={props.destination}></BreadcrumbsNavigation>
                    <Header main={props.destination.city} background="Reviews"></Header>
                    <Stars score={props.statistics.averageScore}></Stars>
                </FlexBox>

                <PointsDistributionComponent
                    statistics={props.statistics} //
                    pointsDistribution={props.pointsDistribution}
                ></PointsDistributionComponent>

                <MoreInformation slug={props.destination.slug}></MoreInformation>
            </LeftSideContent>

            <DestinationPicture picture={props.destination.folder}></DestinationPicture>
        </FlexBox>
    );
};

export default Landing;
