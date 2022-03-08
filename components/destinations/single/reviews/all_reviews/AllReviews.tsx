// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/SingleDestination";
// Material UI Components
import Button from "@mui/material/Button";
// Other components
import Link from "next/link";
import SingleReview from "./single_review/SingleReview";
import ScrollableBox from "@/components/_utils/styled/ScrollableBox";
// Styled components
const SeeAllReviews = styled(Button)(({ theme }) => ({
    fontSize: "1.5rem",
    margin: "30px 0 10px 0",
    padding: "0px 20px",
    alignSelf: "center",
    cursor: "pointer",
    textAlign: "center",
}));
interface AllReviewsProps {
    reviews: Review[];
    sx: Record<string, any>;
    totalReviews: number;
    slug: string;
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

            <SeeAllReviews variant="outlined">
                <Link href={`/destinations/${props.slug}/reviews`} passHref>
                    <span>
                        See all <strong>{props.totalReviews}</strong> reviews
                    </span>
                </Link>
            </SeeAllReviews>
        </ScrollableBox>
    );
};

export default AllReviews;
