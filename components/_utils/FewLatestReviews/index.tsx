// Tools
import colorTheme from "@/colorTheme";
import { useRouter } from "next/router";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/landmarks/SingleLandmark";
// Other components
import AllReviews from "./AllReviews";
import Section from "@/components/_utils/Section";
import UnfadeOnScroll from "@/components/_utils/UnfadeOnScroll";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
// Material UI Icons
import ShowChart from "@mui/icons-material/ShowChart";

interface ReviewsProps {
    reviews: Review[];
    url: string;
    reviewsInTotal: number;
    reviewsType: "landmark" | "destination";
}

const Reviews: FunctionComponent<ReviewsProps> = (props) => {
    const { reviews, url, reviewsInTotal, reviewsType } = props;
    const router = useRouter();

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
                {(() => {
                    if (reviewsInTotal === 0) {
                        return (
                            <ThereAreNoResults
                                router={router} //
                                header="There are no reviews yet"
                            ></ThereAreNoResults>
                        );
                    } else {
                        return (
                            <AllReviews
                                reviews={reviews} //
                                totalReviews={reviewsInTotal}
                                url={url}
                                reviewsType={reviewsType}
                            ></AllReviews>
                        );
                    }
                })()}
            </UnfadeOnScroll>
        </Section>
    );
};

export default Reviews;
