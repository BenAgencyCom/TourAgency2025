// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { ScoreColor } from "@/@types/pages/destinations/SingleDestination";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Other components
import ReviewerAvatar from "./ReviewerAvatar";
import Score from "./Score";
import Date from "./Date";
import Flag from "@/components/_utils/Flag";
// Styled component
import FlexBox from "@/components/_utils/styled/FlexBox";

const Name = styled("h4")(({ theme }) => ({
    fontSize: "2.2rem",
    fontWeight: "700",
    margin: "0 10px 0 0 ",
}));
const Age = styled("span")(({ theme }) => ({
    fontSize: "1.3rem",
    paddingBottom: "5px",
}));

interface SingleReviewHeaderProps {
    review: Review;
    color: ScoreColor;
}

const SingleReviewHeader: FunctionComponent<SingleReviewHeaderProps> = (props) => {
    const { review } = props;
    const { reviewer } = review;
    const fullName = `${reviewer.name} ${reviewer.surname},`;

    return (
        <FlexBox vertical="between" sx={{ position: "relative" }}>
            <Flag
                countryCode={reviewer.countryCode}
                country={reviewer.country}
                sx={{
                    position: "absolute",
                    top: "-0px",
                    right: "-0px",
                }}
            ></Flag>

            <Score color={props.color} points={review.points}></Score>
            <ReviewerAvatar avatar={reviewer.avatar} id={reviewer.id}></ReviewerAvatar>

            <FlexBox column vertical="evenly">
                <Date createdAt={props.review.createdAt}></Date>

                <FlexBox vertical="end">
                    <Name>{fullName}</Name>
                    <Age>{`${reviewer.age} years old`}</Age>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    );
};

export default SingleReviewHeader;
