// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/Reviews";
import type { PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import Stars from "./Stars";
import Header from "./Header";
import LandmarkPicture from "./LandmarkPicture";
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";
import PointsDistributionComponent from "@/components/_utils/PointsDistribution";
import PointsDistributionComponentSkeleton from "@/components/_utils/PointsDistribution/SkeletonLoading";
import ReadMore from "@/components/_utils/ReadMore";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import { LeftSideContent, Wrapper } from "@/components/_utils/styled/pages/BulkReviews";

interface LandingProps {
    statistics: Statistics | null;
    pointsDistribution: PointsDistribution | null;
    landmark: Landmark;
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

    const { continent, country, city } = props.landmark.destination;

    return (
        <Wrapper>
            <LeftSideContent>
                <FlexBox column horizontal="start">
                    <LocalizationBreadCrumbs crumbs={[continent, country, city]} />
                    <Header main={props.landmark.title} backgroundHeader="Reviews" />
                    <Stars score={props.statistics?.averageScore} />
                    <Typography variant="body2">{props.landmark.shortDescription}</Typography>
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
                <ReadMore url={`/landmarks/${props.landmark.slug}`} sx={{ height: "46px !important" }}></ReadMore>
            </LeftSideContent>

            <LandmarkPicture folder={props.landmark.folder} />
        </Wrapper>
    );
};

export default Landing;
