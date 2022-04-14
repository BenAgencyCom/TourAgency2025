// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
// Other components
import BasedOn from "./BasedOn";
import AverageScore from "./AverageScore";
import PointsBar from "./PointsBar";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface PointsDistributionProps {
    averageScore: number;
    reviewsInTotal: number;
    predominant: ReviewType;
    pointsDistribution: Record<ReviewType, number>;
    hideBasedOn?: true;
    sx?: SxProps;
}

const PointsDistributionComponent: FunctionComponent<PointsDistributionProps> = (props) => {
    const { predominant, reviewsInTotal, pointsDistribution, averageScore } = props;

    return (
        <FlexBox column sx={props.sx}>
            {(() => {
                if (!props.hideBasedOn) {
                    return (
                        <BasedOn>
                            Based on <strong>{reviewsInTotal}</strong> reviews
                        </BasedOn>
                    );
                }
            })()}

            <FlexBox horizontal="between" sx={{ flexGrow: 1 }}>
                <AverageScore
                    averageScore={averageScore} //
                    predominant={predominant}
                ></AverageScore>
                <FlexBox column sx={{ flexGrow: 1, ml: "20px" }}>
                    <PointsBar type="POSITIVE" pointsDistribution={pointsDistribution} predominant={predominant}></PointsBar>
                    <PointsBar type="MIXED" pointsDistribution={pointsDistribution} predominant={predominant}></PointsBar>
                    <PointsBar type="NEGATIVE" pointsDistribution={pointsDistribution} predominant={predominant}></PointsBar>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    );
};

export default PointsDistributionComponent;
