// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
import type { Destination } from "@/@types/pages/destinations/Reviews";
import type { PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Other components
import Stars from "./Stars";
import Header from "./Header";
import DestinationPicture from "./DestinationPicture";
import BreadcrumbsNavigation from "./BreadCrumbsNavigation";
import PointsDistributionComponent from "@/components/_utils/PointsDistribution";
import PointsDistributionComponentSkeleton from "@/components/_utils/PointsDistribution/SkeletonLoading";
import ReadMore from "@/components/_utils/ReadMore";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const LeftSideContent = styled(FlexBox)(({ theme }) => ({
    paddingRight: "100px",
    flexGrow: 1,
}));

interface LandingProps {
    statistics: Statistics | null;
    pointsDistribution: PointsDistribution | null;
    destination: Destination;
}

const Landing: FunctionComponent<LandingProps> = (props) => {
    // Establish predominant review's type:
    const predominant: ReviewType | "_loading" = ((): ReviewType | "_loading" => {
        if (!props.pointsDistribution) return "_loading";
        const { MIXED, NEGATIVE, POSITIVE } = props.pointsDistribution;
        if (POSITIVE >= NEGATIVE && POSITIVE >= MIXED) return "POSITIVE";
        else if (MIXED > POSITIVE && MIXED >= NEGATIVE) return "MIXED";
        return "NEGATIVE";
    })();

    return (
        <FlexBox horizontal="between" sx={{ mt: "50px", width: "100%", mb: "100px" }}>
            <LeftSideContent column vertical="evenly">
                <FlexBox column>
                    <BreadcrumbsNavigation destination={props.destination} />
                    <Header main={props.destination.city} background="Reviews" />
                    <Stars score={props.statistics?.averageScore} />
                </FlexBox>

                {(() => {
                    if (props.pointsDistribution && props.statistics && predominant !== "_loading") {
                        return (
                            <PointsDistributionComponent
                                averageScore={props.statistics.averageScore}
                                predominant={predominant}
                                reviewsInTotal={props.statistics.recordsInTotal}
                                pointsDistribution={props.pointsDistribution}
                            />
                        );
                    } else return <PointsDistributionComponentSkeleton />;
                })()}
                <ReadMore url={`/destinations/${props.destination.slug}`} sx={{ height: "46px !important" }}></ReadMore>
            </LeftSideContent>

            <DestinationPicture folder={props.destination.folder} />
        </FlexBox>
    );
};

export default Landing;
