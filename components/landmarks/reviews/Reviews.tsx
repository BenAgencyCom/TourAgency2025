// Tools
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import SingleReview from "@/components/_utils/SingleReview";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import Loading from "@/components/_utils/Loading";

interface ReviewsProps {
    reviews: Review[];
    landmarkId: string;
    reviewsAreLoading: boolean;
    paginationProperties: PaginationProperties;
}

const Reviews: FunctionComponent<ReviewsProps> = (props) => {
    return (
        <FlexBox column sx={{ mb: "50px", position: "relative", minHeight: "100vh" }}>
            {(() => {
                if (props.reviewsAreLoading) {
                    return <Loading></Loading>;
                } else {
                    return (
                        <Fade in={true}>
                            <FlexBox column horizontal="center">
                                {props.reviews.map((review, index) => {
                                    return (
                                        <SingleReview
                                            key={index} //
                                            review={review}
                                            record={{
                                                id: props.landmarkId,
                                                type: "landmark",
                                            }}
                                        ></SingleReview>
                                    );
                                })}
                            </FlexBox>
                        </Fade>
                    );
                }
            })()}
        </FlexBox>
    );
};

export default Reviews;
