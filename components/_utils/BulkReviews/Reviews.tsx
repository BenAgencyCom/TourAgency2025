// Tools
import { styled } from "@mui/system";
import useBulkReviewsContext from "@/components/_utils/BulkReviews/hooks/useBulkReviewsContext";
// Types
import type { FunctionComponent } from "react";
// Other components
import SingleReview from "@/components/_utils/SingleReview";
// Styled components
const ReviewsWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    marginBottom: "50px",
    position: "relative",
    miHeight: "100vh",
}));

const Reviews: FunctionComponent = () => {
    const context = useBulkReviewsContext();

    return (
        <ReviewsWrapper>
            {context.fetchingResult.reviews.value.map((review, index) => {
                return (
                    <SingleReview
                        key={index} //
                        review={review}
                        record={{
                            id: context.idOfReviewingItem,
                            type: "destination",
                        }}
                    ></SingleReview>
                );
            })}
        </ReviewsWrapper>
    );
};

export default Reviews;
