// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/SingleDestination";
// Other components
import SingleReview from "./single_review/SingleReview";
import ScrollableBox from "@/components/_utils/styled/ScrollableBox";

interface AllReviewsProps {
    reviews: Review[];
    sx: Record<string, any>;
}
const AllReviews: FunctionComponent<AllReviewsProps> = (props) => {
    const { reviews } = props;
    return (
        <ScrollableBox
            sx={{
                ...props.sx,
                paddingRight: "40px",
            }}
        >
            {reviews.map((item, index) => {
                return (
                    <SingleReview
                        key={index} //
                        review={item}
                        isLatest={index === reviews.length - 1}
                    ></SingleReview>
                );
            })}
        </ScrollableBox>
    );
};

export default AllReviews;
