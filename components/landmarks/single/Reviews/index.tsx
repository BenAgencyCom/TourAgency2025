// Tools
import colorTheme from "@/colorTheme";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/landmarks/SingleLandmark";
// Other components
import Section from "@/components/_utils/Section";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
import AllReviews from "@/components/destinations/single/Reviews/AllReviews";
// Material UI Icons
import ShowChart from "@mui/icons-material/ShowChart";

interface ReviewsProps {
    reviews: Review[];
    slug: string;
    reviewsInTotal: number;
}

const Reviews: FunctionComponent<ReviewsProps> = (props) => {
    const { reviews, slug, reviewsInTotal } = props;
    return (
        <Section
            id="reviews"
            background={colorTheme.palette.background.default}
            mobileIcon={<ShowChart></ShowChart>}
            header={{
                text: "Users experiences",
                buttonMsg: `See all reviews`,
                url: `/landmarks/${slug}/reviews`,
                biggerHeader: "reviews",
            }}
        >
            <UnfadeOnScroll>
                <AllReviews
                    reviews={reviews} //
                    totalReviews={reviewsInTotal}
                    slug={slug}
                ></AllReviews>
            </UnfadeOnScroll>
        </Section>
    );
};

export default Reviews;
