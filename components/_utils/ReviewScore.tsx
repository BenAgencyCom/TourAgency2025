// Tools
import { styled } from "@mui/system";
import getColorBasedOnType from "@/utils/client/getColorBasedOnType";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
// Styled component
const Wrapper = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 700,
    color: "white",
    userSelect: "none",
    borderRadius: "5px",
}));

interface ReviewScoreProps {
    type: ReviewType | "NO_SCORE";
    sx?: SxProps;
    points?: number;
    className?: string;
}

const ReviewScore: FunctionComponent<ReviewScoreProps> = (props) => {
    const formatPoints = (points: number): string | number => {
        return String(points).length === 1 ? `${points}.0` : points;
    };

    return (
        <Wrapper
            sx={{
                background: getColorBasedOnType(props.type), //
                ...props.sx,
            }}
            className={props.className}
        >
            {props.points !== undefined ? formatPoints(props.points) : "-"}
        </Wrapper>
    );
};

export default ReviewScore;
