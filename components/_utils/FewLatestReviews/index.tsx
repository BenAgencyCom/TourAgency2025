// Tools
import colorTheme from "@/colorTheme";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/landmarks/SingleLandmark";
// Other components
import AllReviews from "./AllReviews";
import Section from "@/components/_utils/Section";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
// Material UI Icons
import ShowChart from "@mui/icons-material/ShowChart";

interface ReviewsProps {
    reviews: Review[];
    url: string;
    reviewsInTotal: number;
}

const Reviews: FunctionComponent<ReviewsProps> = (props) => {
    const { reviews, url, reviewsInTotal } = props;
    return (
        <Section
            id="reviews"
            background={colorTheme.palette.background.default}
            mobileIcon={<ShowChart></ShowChart>}
            header={{
                text: "Users experiences",
                buttonMsg: `See all reviews`,
                url: url,
                biggerHeader: "reviews",
            }}
        >
            <UnfadeOnScroll>
                <AllReviews
                    reviews={reviews} //
                    totalReviews={reviewsInTotal}
                    url={url}
                ></AllReviews>
            </UnfadeOnScroll>
        </Section>
    );
};

export default Reviews;
