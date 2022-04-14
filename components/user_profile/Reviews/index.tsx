// Tools
import { useState } from "react";
import { useRouter } from "next/router";
import stated from "@/utils/client/stated";
import { getDefaultReviewingType } from "@/utils/client/reviewsSortingHelpers";
import FetchData from "../_utils/FetchData";
// Types
import type { FunctionComponent } from "react";
import type { ReviewingType } from "@/@types/SortReviews";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { LandmarkReview, DestinationReview } from "@/@types/pages/UserProfile";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Header from "./Header";
import Sort from "./Sort";
import ResultsInTotal from "./ResultsInTotal";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import Loading from "@/components/_utils/Loading";

interface ReviewsWrapperProps {
    userID: string;
}

const ReviewsWrapper: FunctionComponent<ReviewsWrapperProps> = (props) => {
    const router = useRouter();
    // To handle sort:
    const [reviewingType, setReviewingType] = useState<ReviewingType>(getDefaultReviewingType(router.query.reviewingType));
    // Fetched data:
    const [loading, setLoading] = useState<boolean>(false);
    const [reviews, setReviews] = useState<LandmarkReview[] | DestinationReview[]>([]);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);
    const [fetchedReviewsType, setFetchedReviewsType] = useState<ReviewingType | null>(null);

    const refreshData = async () => {
        setLoading(true);
        const perPage = reviewingType === "destination" ? 4 : 9;

        const result = await FetchData({
            userID: props.userID, //
            router: router,
            perPage,
        });
        if (result) {
            setLoading(false);
            setPaginationProperties(result.paginationProperties);
            setReviews(result.reviews);
            setFetchedReviewsType(result.fetchedReviewsType);
        }
    };

    return (
        <Box sx={{ mt: "100px" }}>
            <Header background={`${reviewingType}s`}>Reviews</Header>
            <FlexBox vertical="center">
                <Sort
                    reviewingType={stated(reviewingType, setReviewingType)} //
                    refreshData={refreshData}
                ></Sort>
                {paginationProperties && <ResultsInTotal>{paginationProperties.recordsInTotal}</ResultsInTotal>}
            </FlexBox>

            <FlexBox column sx={{ position: "relative", marginTop: "60px", minHeight: "300px" }}>
                {(() => {
                    if (loading || (fetchedReviewsType === null && paginationProperties === null)) {
                        return <Loading></Loading>;
                    } else {
                        return (
                            <>
                                <span>{JSON.stringify(fetchedReviewsType)}</span>
                                <hr />
                                <span>{JSON.stringify(reviews)}</span>
                                <hr />
                                <span>{JSON.stringify(paginationProperties)}</span>
                            </>
                        );
                    }
                })()}
            </FlexBox>
        </Box>
    );
};

export default ReviewsWrapper;
