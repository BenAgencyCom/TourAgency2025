// Tools
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/SingleDestination";
// Other components
import SingleReview from "./single_review/SingleReview";
import ScrollableBox from "@/components/_utils/styled/ScrollableBox";
// Material UI Components
import Box from "@mui/material/Box";

interface AllReviewsProps {
    reviews: Review[];
    sx: Record<string, any>;
}
const AllReviews: FunctionComponent<AllReviewsProps> = (props) => {
    const { reviews } = props;
    return (
        <ScrollableBox sx={props.sx}>
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
