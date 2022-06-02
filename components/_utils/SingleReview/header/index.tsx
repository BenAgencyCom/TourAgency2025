// Tools
import dynamic from "next/dynamic";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { ScoreColor } from "@/@types/pages/destinations/SingleDestination";
// Other components
import Date from "./Date";
import Flag from "@/components/_utils/Flag";
import ReviewerAvatar from "./ReviewerAvatar";
import Score from "@/components/_utils/ReviewScore";
// Styled component
import FlexBox from "@/components/_utils/styled/FlexBox";

const Name = styled("h4")(({ theme }) => ({
    fontSize: "2.2rem",
    fontWeight: "700",
    margin: "0 10px 0 0 ",
}));
const Age = styled("span")(({ theme }) => ({
    fontSize: "1.2rem",
    paddingBottom: "5px",
}));

interface SingleReviewHeaderProps {
    review: Review;
}

const SingleReviewHeader: FunctionComponent<SingleReviewHeaderProps> = (props) => {
    const { review } = props;
    const { reviewer } = review;
    const fullName = `${reviewer.name} ${reviewer.surname},`;

    return (
        <FlexBox
            vertical="between" //
            sx={{ position: "relative" }}
            className="landmark-review-header"
        >
            <Flag
                countryCode={reviewer.countryCode}
                country={reviewer.country}
                sx={{
                    position: "absolute",
                    top: "-0px",
                    right: "-0px",
                }}
                className="flag"
            ></Flag>
            <FlexBox>
                <Score
                    type={review.type}
                    points={review.points}
                    sx={{
                        width: "90px",
                        alignSelf: "stretch",
                        fontSize: "3rem",
                        color: "#fff",
                    }}
                    className="score"
                ></Score>
                <ReviewerAvatar avatar={reviewer.avatar} id={reviewer.id}></ReviewerAvatar>
            </FlexBox>

            <FlexBox column vertical="evenly">
                <Date createdAt={props.review.createdAt}></Date>

                <FlexBox vertical="end" className="personal-information">
                    <Name>{fullName}</Name>
                    <Age>{`${reviewer.age} years old`}</Age>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    );
};

export default SingleReviewHeader;
