// Tools
import { styled } from "@mui/system";
import _SingleReviewWrapperStyles from "./_SingleReviewWrapperStyles";
import getColorBasedOnType from "@/utils/client/getColorBasedOnType";
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
import Sailing from "@mui/icons-material/Sailing";
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
        "svg.background-icon": {
            position: "absolute",
            bottom: "-5px",
            right: "-40px",
            fontSize: "17rem",
            opacity: 0.1,
        },
    },
    "&.authenticated-user-review": {
        "svg.background-icon": {
            position: "absolute",
            bottom: "10px",
            right: "0px",
            fontSize: "17rem",
            opacity: 0.1,
        },
    },
}));

interface SingleReviewProps {
    review: Review;
    sx?: SxProps;
    pinned?: true;
    authenticatedUserReview?: true;
    record: {
        id: string;
        type: "destination" | "landmark";
    };
}
const SingleReview: FunctionComponent<SingleReviewProps> = (props) => {
    const { review } = props;
    const color = getColorBasedOnType(review.type);

    return (
        <SingleReviewWrapper
            column //
            sx={props.sx}
            className={[
                "single-review", //
                props.pinned ? "pinned" : "",
                props.authenticatedUserReview ? "authenticated-user-review" : "",
            ].join(" ")}
        >
            {props.pinned && <PushPin className="background-icon" />}
            {props.authenticatedUserReview && <Sailing className="background-icon" />}

            <SingleReviewHeader review={review}></SingleReviewHeader>
            <SingleReviewTags tags={review.tags} color={color}></SingleReviewTags>
            <Typography variant="body2">{review.review}</Typography>

            <Divider flexItem sx={{ my: "10px" }}></Divider>
            <Likes
                feedback={review.feedback} //
                reviewId={review.id}
                record={props.record}
            ></Likes>
        </SingleReviewWrapper>
    );
};

export default SingleReview;
