// Tools
import { styled } from "@mui/system";
import colorTheme from "@/colorTheme";
// Types
import type { FunctionComponent } from "react";
// Other components
import Section from "@/components/destinations/single/_utils/Section";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
import Ratings from "@/components/destinations/single/reviews/Ratings";
import UserReview from "@/components/destinations/single/reviews/user_review/UserReview";
import AllReviews from "@/components/destinations/single/reviews/all_reviews/AllReviews";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled(FlexBox)(({ theme }) => ({
    width: "100%",
    height: "600px",
    userSelect: "none",
}));

const Reviews: FunctionComponent = () => {
    const { ratings, data, totalReviews } = useAppSelector((state) => state.singleDestination);
    const { reviews, slug } = data;

    return (
        <Section
            id="reviews"
            background={colorTheme.palette.background.default}
            header={{
                text: "Users experiences",
                buttonMsg: `See all reviews`,
                url: `/destinations/${slug}/reviews`,
                biggerHeader: "reviews",
            }}
        >
            <UnfadeOnScroll>
                {/*  */}
                {/* CONTENT */}
                {/*  */}
                <Wrapper horizontal="between">
                    <FlexBox
                        column //
                        vertical="between"
                        horizontal="center"
                        sx={{ width: "360px" }}
                    >
                        <Ratings totalReviews={totalReviews} ratings={ratings}></Ratings>
                        <UserReview></UserReview>
                    </FlexBox>

                    <AllReviews
                        reviews={reviews} //
                        totalReviews={totalReviews}
                        slug={slug}
                        sx={{ width: "calc(100% - 360px - 40px)" }}
                    ></AllReviews>
                </Wrapper>
            </UnfadeOnScroll>
        </Section>
    );
};

export default Reviews;
