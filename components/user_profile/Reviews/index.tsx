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
import Sort from "./Sort";
import Header from "./Header";
import ReviewsList from "./ReviewsList";
import ResultsInTotal from "./ResultsInTotal";
import Pagination from "@/components/_utils/Pagination";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface ReviewsWrapperProps {
    userID: string;
    thereIsNoDataAtAll: boolean;
}

const ReviewsWrapper: FunctionComponent<ReviewsWrapperProps> = (props) => {
    const router = useRouter();
    // To handle sort:
    const [reviewingType, setReviewingType] = useState<ReviewingType>(getDefaultReviewingType(router.query.reviewingType));
    // Fetched data:
    const [loading, setLoading] = useState<boolean>(!props.thereIsNoDataAtAll);
    const [reviews, setReviews] = useState<LandmarkReview[] | DestinationReview[]>([]);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);
    const [fetchedReviewsType, setFetchedReviewsType] = useState<ReviewingType | null>(null);

    const refreshData = async (pageNumber?: number) => {
        if (props.thereIsNoDataAtAll) return;
        if (pageNumber) router.query.page = String(pageNumber);

        setLoading(true);
        const perPage = reviewingType === "destination" ? 4 : 9;

        const result = await FetchData({
            userID: props.userID, //
            router: router,
            perPage,
        });
        if (result) {
            setPaginationProperties(result.paginationProperties);
            setReviews(result.reviews);
            setFetchedReviewsType(result.fetchedReviewsType);
            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    };

    useEffect(() => {
        if (props.thereIsNoDataAtAll) return;

        let isMounted = true;
        const perPage = reviewingType === "destination" ? 4 : 9;

        (async () => {
            const result = await FetchData({
                userID: props.userID, //
                router: router,
                perPage,
            });
            if (result && isMounted) {
                setPaginationProperties(result.paginationProperties);
                setReviews(result.reviews);
                setFetchedReviewsType(result.fetchedReviewsType);
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [router, router.query, props.userID, reviewingType, props.thereIsNoDataAtAll]);

    return (
        <Box sx={{ mt: "200px", position: "relative", zIndex: "1", pb: "100px" }}>
            <Header background={`${reviewingType}s`} id="reviews-header">
                Reviews
            </Header>
            <FlexBox vertical="center">
                <Sort
                    reviewingType={stated(reviewingType, setReviewingType)} //
                    refreshData={refreshData}
                    disabled={!paginationProperties || paginationProperties.recordsInTotal === 0}
                    thereIsNoDataAtAll={props.thereIsNoDataAtAll}
                ></Sort>
                {paginationProperties && <ResultsInTotal>{paginationProperties.recordsInTotal}</ResultsInTotal>}
            </FlexBox>

            {(() => {
                if (!loading && (props.thereIsNoDataAtAll || paginationProperties?.recordsInTotal === 0)) {
                    return (
                        <ThereAreNoResults
                            header="There are no reviews" //
                            moreInformation={[
                                <span key="inf0">
                                    {(() => {
                                        if (!props.thereIsNoDataAtAll)
                                            return (
                                                <span>
                                                    This particular user has not reviewed any <strong>{reviewingType}</strong> yet
                                                </span>
                                            );
                                        else
                                            return (
                                                <span>
                                                    This particular user has not reviewed <strong>anything</strong> yet
                                                </span>
                                            );
                                    })()}
                                </span>,
                            ]}
                        ></ThereAreNoResults>
                    );
                } else {
                    return (
                        <>
                            <ReviewsList
                                reviews={reviews} //
                                fetchedReviewsType={fetchedReviewsType}
                                somethingIsLoading={!props.thereIsNoDataAtAll && (loading || (fetchedReviewsType === null && paginationProperties === null))}
                            ></ReviewsList>

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
                        </>
                    );
                }
            })()}
        </Box>
    );
};

export default ReviewsWrapper;
