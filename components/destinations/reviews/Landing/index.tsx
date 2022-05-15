// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
import type { Destination } from "@/@types/pages/destinations/Reviews";
import type { PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import Stars from "./Stars";
import Header from "./Header";
import DestinationPicture from "./DestinationPicture";
import PointsDistributionComponent from "@/components/_utils/PointsDistribution";
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";
import PointsDistributionComponentSkeleton from "@/components/_utils/PointsDistribution/SkeletonLoading";
import ReadMore from "@/components/_utils/ReadMore";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import { LeftSideContent } from "@/components/_utils/styled/pages/BulkReviews";

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

    const { continent, country, city } = props.destination;

    return (
        <FlexBox horizontal="between" sx={{ mt: "50px", width: "100%", mb: "100px" }}>
            <LeftSideContent>
                <FlexBox column horizontal="start">
                    <LocalizationBreadCrumbs crumbs={[continent, country, city]} />
                    <Header main={props.destination.city} backgroundHeader="Reviews" />
                    <Stars score={props.statistics?.averageScore} />
                    <Typography variant="body2">{props.destination.shortDescription}</Typography>
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
