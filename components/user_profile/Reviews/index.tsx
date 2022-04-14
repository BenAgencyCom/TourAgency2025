// Tools
import { useRouter } from "next/router";
import stated from "@/utils/client/stated";
import FetchData from "../_utils/FetchData";
import { useState, useEffect } from "react";
import { getDefaultReviewingType } from "@/utils/client/reviewsSortingHelpers";
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
import SingleLandmark from "@/components/_utils/SingleLandmark";
import Pagination from "@/components/_utils/Pagination";
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

    const refreshData = async (pageNumber?: number) => {
        if (pageNumber) router.query.page = String(pageNumber);

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

    useEffect(() => {
        let isMounted = true;
        const perPage = reviewingType === "destination" ? 4 : 9;

        (async () => {
            const result = await FetchData({
                userID: props.userID, //
                router: router,
                perPage,
            });
            if (result && isMounted) {
                setLoading(false);
                setPaginationProperties(result.paginationProperties);
                setReviews(result.reviews);
                setFetchedReviewsType(result.fetchedReviewsType);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [router, router.query, props.userID, reviewingType]);

    return (
        <Box sx={{ mt: "100px" }}>
            <Header background={`${reviewingType}s`} id="reviews-header">
                Reviews
            </Header>
            <FlexBox vertical="center">
                <Sort
                    reviewingType={stated(reviewingType, setReviewingType)} //
                    refreshData={refreshData}
                ></Sort>
                {paginationProperties && <ResultsInTotal>{paginationProperties.recordsInTotal}</ResultsInTotal>}
            </FlexBox>

            <FlexBox
                sx={{
                    position: "relative", //
                    marginTop: "60px",
                    minHeight: "1000px",
                    flexWrap: "wrap",
                }}
            >
                {/* Display reviews */}
                {(() => {
                    if (loading || (fetchedReviewsType === null && paginationProperties === null)) {
                        return <Loading sx={{ top: "10%" }}></Loading>;
                    } else {
                        if (fetchedReviewsType === "landmark") {
                            return (reviews as LandmarkReview[]).map((review, index) => {
                                return (
                                    <SingleLandmark
                                        data={review.landmark} //
                                        key={review.landmark.slug}
                                        sx={{ mb: "20px", ml: index % 3 ? "20px" : 0 }}
                                        userReview={{
                                            points: review.points,
                                            type: review.type,
                                        }}
                                    ></SingleLandmark>
                                );
                            });
                        }
                    }
                })()}
            </FlexBox>
            {(() => {
                if (paginationProperties && paginationProperties.pagesInTotal > 1) {
                    return (
                        <Pagination
                            paginationProperties={paginationProperties} //
                            scrollToElement="reviews-header"
                            callbackDuringScrolling={(pageNumber: number) => {
                                refreshData(pageNumber);
                            }}
                        ></Pagination>
                    );
                }
            })()}
        </Box>
    );
};

export default ReviewsWrapper;
