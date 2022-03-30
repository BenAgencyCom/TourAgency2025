// Types
import type { FunctionComponent } from "react";
import type { PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Other components
import BasedOn from "./BasedOn";
import Points from "./Points";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface PointsDistributionProps {
    statistics: Statistics;
    pointsDistribution: PointsDistribution;
}

const PointsDistributionComponent: FunctionComponent<PointsDistributionProps> = (props) => {
    return (
        <FlexBox column>
            <BasedOn>
                Based on <strong>{props.statistics.recordsInTotal}</strong> reviews
            </BasedOn>
            <Points
                averageScore={props.statistics.averageScore} //
                pointsDistribution={props.pointsDistribution}
            ></Points>
        </FlexBox>
    );
};

export default PointsDistributionComponent;
