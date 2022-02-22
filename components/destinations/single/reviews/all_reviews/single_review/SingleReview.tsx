// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/SingleDestination";
// Material UI Components
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// Other components
import SingleReviewHeader from "./header/SingleReviewHeader";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
const SingleReviewWrapper = styled(FlexBox)<{ isLatest?: boolean }>(({ theme, isLatest }) => ({
    width: "100%",
    marginBottom: isLatest ? 0 : "50px",
    padding: "10px",
    boxSizing: "border-box",
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

    return (
        <SingleReviewWrapper isLatest={isLatest} column>
            <SingleReviewHeader review={review}></SingleReviewHeader>
            <Divider flexItem sx={{ my: "20px" }}></Divider>
            <ReviewContent>{review.review}</ReviewContent>
        </SingleReviewWrapper>
    );
};

export default SingleReview;
