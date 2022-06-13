// Tools
import { styled } from "@mui/system";
import useWindowSizes from "@/hooks/useWindowSizes";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Material UI Components
import Button from "@mui/material/Button";
// Other components
import Link from "next/link";
import SingleReview from "@/components/_utils/SingleReview";
import ScrollableBox from "@/components/_utils/styled/ScrollableBox";
// Styled components
const SeeAllReviews = styled(Button)(({ theme }) => ({
    fontSize: "1.3rem",
    margin: "30px 0 10px 0",
    padding: "0px 20px",
    alignSelf: "center",
    cursor: "pointer",
    textAlign: "center",
}));
interface AllReviewsProps {
    reviews: Review[];
    sx?: SxProps;
    totalReviews: number;
    url: string;
    reviewsType: "landmark" | "destination";
}
const AllReviews: FunctionComponent<AllReviewsProps> = (props) => {
    const { width } = useWindowSizes();
    const { reviews } = props;

    const reviewToDisplay = width <= 700 ? reviews.slice(0, 4) : reviews;

    return (
        <ScrollableBox
            sx={{
                ...props.sx,
                paddingRight: "40px",
            }}
            maxHeight="600px"
            className="reviews-wrapper"
        >
            {reviewToDisplay.map((item, index) => {
                return (
                    <SingleReview
                        key={index} //
                        review={item}
                        record={{
                            id: item.id,
                            type: props.reviewsType,
                        }}
                    ></SingleReview>
                );
            })}

            {(() => {
                if (width > 1000) {
                    return (
                        <SeeAllReviews variant="outlined">
                            <Link href={props.url} passHref>
                                <span>
                                    See all <strong>{props.totalReviews}</strong> reviews
                                </span>
                            </Link>
                        </SeeAllReviews>
                    );
                }
            })()}
        </ScrollableBox>
    );
};

export default AllReviews;
