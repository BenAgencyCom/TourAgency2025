// Tools
import { styled } from "@mui/system";
import _SingleReviewWrapperStyles from "./_SingleReviewWrapperStyles";
// Types
import type { FunctionComponent } from "react";
import type { ScoreColor } from "@/@types/pages/destinations/SingleDestination";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Material UI Components
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// Other components
import SingleReviewHeader from "./header";
import SingleReviewTags from "./SingleReviewTags";
import Likes from "./Likes";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const SingleReviewWrapper = styled(FlexBox)(({ theme }) => ({
    ...(_SingleReviewWrapperStyles as any),
    //
    hr: {
        borderColor: theme.palette.background.lightPaper,
    },
    p: {
        userSelect: "select",
    },
    "&:nth-of-type(1)": {
        marginTop: "0px !important",
    },
}));

interface SingleReviewProps {
    review: Review;
}
const SingleReview: FunctionComponent<SingleReviewProps> = (props) => {
    const { review } = props;
    const { width } = useAppSelector((state) => state.windowSizes);

    const color = ((): ScoreColor => {
        const { points } = review;
        if (points > 7.5) return "success";
        else if (points > 4.5) return "warning";
        return "error";
    })();

    return (
        <SingleReviewWrapper column>
            <SingleReviewHeader review={review} color={color}></SingleReviewHeader>
            {width <= 700 && <Divider flexItem sx={{ my: "10px" }}></Divider>}
            <SingleReviewTags tags={review.tags} color={color}></SingleReviewTags>
            <Typography variant="body1">{review.review}</Typography>

            <Divider flexItem sx={{ my: "10px" }}></Divider>
            <Likes feedback={review.feedback}></Likes>
        </SingleReviewWrapper>
    );
};

export default SingleReview;
