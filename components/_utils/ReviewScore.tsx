// Tools
import { styled } from "@mui/system";
import getColorBasedOnScore from "@/utils/client/getColorBasedOnScore";
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
}));

interface ReviewScoreProps {
    type: ReviewType;
    sx?: SxProps;
}

const ReviewScore: FunctionComponent<ReviewScoreProps> = (props) => {
    return (
        <Wrapper
            sx={{
                background: getColorBasedOnScore(props.type), //
                ...props.sx,
            }}
        >
            {props.children}
        </Wrapper>
    );
};

export default ReviewScore;
