// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
import type { PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Other components
import BasedOn from "./BasedOn";
import AverageScore from "./AverageScore";
import PointsBar from "./PointsBar";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface PointsDistributionProps {
    statistics: Statistics;
    pointsDistribution: PointsDistribution;
}

const PointsDistributionComponent: FunctionComponent<PointsDistributionProps> = (props) => {
    // Establish predominant review's type:
    const predominant: ReviewType = ((): ReviewType => {
        const { MIXED, NEGATIVE, POSITIVE } = props.pointsDistribution;
        if (POSITIVE >= NEGATIVE && POSITIVE >= MIXED) return "POSITIVE";
        else if (MIXED > POSITIVE && MIXED >= NEGATIVE) return "MIXED";
        return "NEGATIVE";
    })();

    return (
        <FlexBox column>
            <BasedOn>
                Based on <strong>{props.statistics.recordsInTotal}</strong> reviews
            </BasedOn>

            <FlexBox horizontal="between" sx={{ flexGrow: 1 }}>
                <AverageScore
                    averageScore={props.statistics.averageScore} //
                    predominant={predominant}
                ></AverageScore>
                <FlexBox column sx={{ flexGrow: 1, ml: "20px" }}>
                    <PointsBar type="POSITIVE" pointsDistribution={props.pointsDistribution} predominant={predominant}></PointsBar>
                    <PointsBar type="MIXED" pointsDistribution={props.pointsDistribution} predominant={predominant}></PointsBar>
                    <PointsBar type="NEGATIVE" pointsDistribution={props.pointsDistribution} predominant={predominant}></PointsBar>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    );
};

export default PointsDistributionComponent;
