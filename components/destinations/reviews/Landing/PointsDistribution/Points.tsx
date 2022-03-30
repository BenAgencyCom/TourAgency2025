// Tools
import { styled } from "@mui/system";
import getColorBasedOnScore from "@/utils/client/getColorBasedOnScore";
// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
import type { PointsDistribution } from "@/@types/pages/api/ReviewsAPI";
// Material UI Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const PointsWrapper = styled(FlexBox)<{ type: ReviewType }>(({ theme, ...props }) => ({
    background: getColorBasedOnScore(props.type),
    color: "#fff",
    width: "80px",
    height: "80px",
    fontSize: "2.5rem",
    userSelect: "none",
    fontWeight: 700,
    borderRadius: "5px",
}));

interface PointsProps {
    averageScore: number;
    pointsDistribution: PointsDistribution;
}
const Points: FunctionComponent<PointsProps> = (props) => {
    // Establish predominant review's type:
    const predominant = ((): ReviewType => {
        const { MIXED, NEGATIVE, POSITIVE } = props.pointsDistribution;
        if (POSITIVE >= NEGATIVE && POSITIVE >= MIXED) return "POSITIVE";
        else if (MIXED > POSITIVE && MIXED >= NEGATIVE) return "MIXED";
        return "NEGATIVE";
    })();

    return (
        <PointsWrapper type={predominant} center>
            {Math.floor(props.averageScore * 10)}
        </PointsWrapper>
    );
};

export default Points;
