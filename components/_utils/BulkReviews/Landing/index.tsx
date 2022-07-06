// Tools
import useBulkReviewsContext from "@/components/_utils/BulkReviews/hooks/useBulkReviewsContext";
import usePredominantReviewType from "@/components/_utils/BulkReviews/hooks/usePredominantReviewType";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import Stars from "./Stars";
import Header from "./Header";
import LandmarkPicture from "./LandmarkPicture";
import LocalizationBreadCrumbs from "@/components/_utils/LocalizationBreadCrumbs";
import PointsDistribution from "@/components/_utils/PointsDistribution";
import PointsDistributionSkeleton from "@/components/_utils/PointsDistribution/SkeletonLoading";
import ReadMore from "@/components/_utils/ReadMore";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import Wrapper from "@/components/_utils/BulkReviews/styled_components/Wrapper";
import LeftSideContent from "@/components/_utils/BulkReviews/styled_components/LeftSideContent";

const Landing: FunctionComponent = (props) => {
    const context = useBulkReviewsContext();
    const predominant = usePredominantReviewType();

    return (
        <Wrapper>
            <LeftSideContent>
                <FlexBox column horizontal="start">
                    <LocalizationBreadCrumbs crumbs={context.landingScreen.breadcrumbs} />
                    <Header
                        main={context.landingScreen.header} //
                        backgroundHeader="Reviews"
                    />
                    <Stars
                        score={context.fetchingResult.statistics.value?.averageScore} //
                        thereAreNoResults={predominant === "NO_SCORE"}
                    />
                    <Typography variant="body2">{context.landingScreen.description}</Typography>
                </FlexBox>

                {(() => {
                    if (
                        predominant === "_loading" || //
                        !context.fetchingResult.statistics.value ||
                        !context.fetchingResult.pointsDistribution.value
                    ) {
                        return <PointsDistributionSkeleton />;
                    } else {
                        return (
                            <PointsDistribution
                                predominant={predominant}
                                averageScore={context.fetchingResult.statistics.value.averageScore}
                                reviewsInTotal={context.fetchingResult.statistics.value.recordsInTotal}
                                pointsDistribution={context.fetchingResult.pointsDistribution.value}
                            />
                        );
                    }
                })()}
                <ReadMore url={`/landmarks/${context.landingScreen.slug}`} sx={{ height: "40px !important", mt: "30px" }} />
            </LeftSideContent>

            <LandmarkPicture />
        </Wrapper>
    );
};

export default Landing;
