// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Review, ScoreColor } from "@/@types/pages/SingleDestination";
// Material UI Components
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// Other components
import SingleReviewHeader from "./header/SingleReviewHeader";
import SingleReviewTags from "./SingleReviewTags";
import Likes from "./Likes";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
const SingleReviewWrapper = styled(FlexBox)<{ isLatest?: boolean }>(({ theme, isLatest }) => ({
    width: "100%",
    marginBottom: isLatest ? 0 : "40px",
    padding: "20px",
    boxSizing: "border-box",
    borderRadius: 10,
    border: `1px solid ${theme.palette.background.lightPaper}`,
    hr: {
        borderColor: theme.palette.background.lightPaper,
    },
}));

const ReviewContent = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    fontWeight: 300,
    letterSpacing: "1px",
}));

interface SingleReviewProps {
    review: Review;
    isLatest?: boolean;
}
const SingleReview: FunctionComponent<SingleReviewProps> = (props) => {
    const { review, isLatest } = props;

    const color = ((): ScoreColor => {
        const { points } = review;
        if (points > 7.5) return "success";
        else if (points > 4.5) return "warning";
        return "error";
    })();

    return (
        <SingleReviewWrapper isLatest={isLatest} column>
            <SingleReviewHeader review={review} color={color}></SingleReviewHeader>
            <Divider flexItem sx={{ mt: "20px" }}></Divider>
            <SingleReviewTags tags={review.tags} color={color}></SingleReviewTags>
            <ReviewContent>{review.review}</ReviewContent>

            <Divider flexItem sx={{ my: "20px" }}></Divider>
            <Likes feedback={review.feedback}></Likes>
        </SingleReviewWrapper>
    );
};

export default SingleReview;
