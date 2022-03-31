// Tools
import { styled } from "@mui/system";
import getColorBasedOnScore from "@/utils/client/getColorBasedOnScore";
// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const AverageScoreWrapper = styled(FlexBox)<{ type: ReviewType }>(({ theme, ...props }) => ({
    background: getColorBasedOnScore(props.type),
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
    predominant: ReviewType;
}
const AverageScore: FunctionComponent<AverageScoreProps> = (props) => {
    return (
        <AverageScoreWrapper type={props.predominant} center>
            {Math.floor(props.averageScore * 10)}
        </AverageScoreWrapper>
    );
};

export default AverageScore;
