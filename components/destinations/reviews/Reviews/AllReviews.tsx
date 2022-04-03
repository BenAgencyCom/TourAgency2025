// Tools
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Other components
import SingleReview from "@/components/_utils/SingleReview";

interface AllReviewsProps {
    reviews: Review[];
}

const AllReviews: FunctionComponent<AllReviewsProps> = (props) => {
    return (
        <>
            {props.reviews.map((review, index) => {
                return <SingleReview key={index} review={review}></SingleReview>;
            })}
        </>
    );
};

export default AllReviews;
