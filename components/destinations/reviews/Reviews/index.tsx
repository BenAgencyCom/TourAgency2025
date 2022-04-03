// Tools
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import Pagination from "@/components/_utils/Pagination";
import AllReviews from "./AllReviews";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import Loading from "@/components/_utils/Loading";

interface ReviewsProps {
    reviews: Review[];
    paginationProperties: PaginationProperties;
    slug: string;
    reviewsAreLoading: boolean;
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
                                <AllReviews reviews={props.reviews}></AllReviews>
                                <Pagination paginationProperties={props.paginationProperties}></Pagination>
                            </FlexBox>
                        </Fade>
                    );
                }
            })()}
        </FlexBox>
    );
};

export default Reviews;
