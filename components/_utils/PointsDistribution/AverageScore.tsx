// Tools
import { styled } from "@mui/system";
import getColorBasedOnType from "@/utils/client/getColorBasedOnType";
// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
// Material UI Icons
import HourglassDisabled from "@mui/icons-material/HourglassDisabled";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const AverageScoreWrapper = styled(FlexBox, {
    shouldForwardProp: (prop: string) => !["predominant"].includes(prop),
})<{ predominant: AverageScoreProps["predominant"] }>(({ theme, ...props }) => ({
    background: getColorBasedOnType(props.predominant),
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
    thereAreNoReviewsAtAll: boolean;
    predominant: ReviewType | "NO_SCORE";
}
const AverageScore: FunctionComponent<AverageScoreProps> = (props) => {
    const score = Math.floor(props.averageScore * 10);

    return (
        <AverageScoreWrapper predominant={props.predominant} center>
            {props.thereAreNoReviewsAtAll ? <HourglassDisabled sx={{ fontSize: "3rem" }} /> : score}
        </AverageScoreWrapper>
    );
};

export default AverageScore;
