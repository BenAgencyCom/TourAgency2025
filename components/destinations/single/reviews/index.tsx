// Tools
import { styled } from "@mui/system";
import colorTheme from "@/colorTheme";
// Types
import type { FunctionComponent } from "react";
// Other components
import Section from "@/components/_utils/Section";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
import Ratings from "@/components/destinations/single/Reviews/Ratings";
import UserReview from "@/components/destinations/single/Reviews/user_review/UserReview";
import AllReviews from "@/components/destinations/single/Reviews/AllReviews";
// Material UI Icons
import ShowChart from "@mui/icons-material/ShowChart";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Wrapper = styled(FlexBox)(({ theme }) => ({
    width: "100%",
    userSelect: "none",
}));

const Reviews: FunctionComponent = () => {
    const { ratings, data, totalReviews } = useAppSelector((state) => state.singleDestination);
    const { reviews, slug } = data;

    return (
        <Section
            id="reviews"
            background={colorTheme.palette.background.default}
            mobileIcon={<ShowChart></ShowChart>}
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
                <Wrapper column>
                    {/* <FlexBox vertical="between" horizontal="center" sx={{ height: "360px" }}>
                        <Ratings totalReviews={totalReviews} ratings={ratings}></Ratings>
                        <UserReview></UserReview>
                    </FlexBox> */}

                    <AllReviews
                        reviews={reviews} //
                        totalReviews={totalReviews}
                        slug={slug}
                    ></AllReviews>
                </Wrapper>
            </UnfadeOnScroll>
        </Section>
    );
};

export default Reviews;
