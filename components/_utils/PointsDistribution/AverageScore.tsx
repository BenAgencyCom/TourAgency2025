// Tools
import { styled } from "@mui/system";
import getColorBasedOnScore from "@/utils/client/getColorBasedOnScore";
import determineReviewType from "@/utils/api/determineReviewType";
// Types
import type { FunctionComponent } from "react";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const AverageScoreWrapper = styled(FlexBox)<{ score: number }>(({ theme, ...props }) => ({
    background: getColorBasedOnScore(determineReviewType(props.score)),
    color: "#fff",
    width: "90px",
    height: "90px",
    fontSize: "3rem",
    userSelect: "none",
    fontWeight: 700,
    borderRadius: "5px",
}));

interface AverageScoreProps {
    averageScore: number;
}
const AverageScore: FunctionComponent<AverageScoreProps> = (props) => {
    return (
        <AverageScoreWrapper score={props.averageScore} center>
            {Math.floor(props.averageScore * 10)}
        </AverageScoreWrapper>
    );
};

export default AverageScore;
