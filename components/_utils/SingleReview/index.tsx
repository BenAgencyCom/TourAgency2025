// Tools
import { styled, alpha } from "@mui/system";
import _SingleReviewWrapperStyles from "./_SingleReviewWrapperStyles";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { ScoreColor } from "@/@types/pages/destinations/SingleDestination";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Material UI Components
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// Material UI Icons
import PushPin from "@mui/icons-material/PushPin";
// Other components
import SingleReviewHeader from "./header";
import SingleReviewTags from "./SingleReviewTags";
import Likes from "./Likes";
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
    "&.pinned": {
        background: alpha("#fff", 0.6),
        "svg.background-pin-icon": {
            position: "absolute",
            bottom: "-5px",
            right: "-60px",
            fontSize: "20rem",
            opacity: 0.1,
        },
    },
}));

interface SingleReviewProps {
    review: Review;
    sx?: SxProps;
    pinned?: true;
}
const SingleReview: FunctionComponent<SingleReviewProps> = (props) => {
    const { review } = props;

    const color = ((): ScoreColor => {
        const { points } = review;
        if (points > 7.5) return "success";
        else if (points > 4.5) return "warning";
        return "error";
    })();

    return (
        <SingleReviewWrapper
            column //
            sx={props.sx}
            className={["single-review", props.pinned ? "pinned" : ""].join(" ")}
        >
            {props.pinned && <PushPin className="background-pin-icon"></PushPin>}

            <SingleReviewHeader review={review} color={color}></SingleReviewHeader>
            <SingleReviewTags tags={review.tags} color={color}></SingleReviewTags>
            <Typography variant="body2">{review.review}</Typography>

            <Divider flexItem sx={{ my: "10px" }}></Divider>
            <Likes feedback={review.feedback}></Likes>
        </SingleReviewWrapper>
    );
};

export default SingleReview;
