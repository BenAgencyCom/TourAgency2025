// Tools
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PrefetchData from "./_utils/PrefetchData";
import _RefreshData from "./_utils/RefreshData";
// Types
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/destinations/Reviews";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { Review, PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Other components
import Sort from "./Sort";
import Landing from "./Landing";
import Reviews from "./Reviews";
import Pagination from "@/components/_utils/Pagination";
// Styled components
import Loading from "@/components/_utils/Loading";

const Wrapper = styled("div")(({ theme }) => ({
    maxWidth: "1450px",
    width: "calc(100vw - 40px)",
    margin: "100px auto 0 auto",
    color: theme.palette.text.primary,
}));

interface ContentParams {
    destination: Destination;
}
const Content: FunctionComponent<ContentParams> = (props) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);
    const [pointsDistribution, setPointsDistribution] = useState<PointsDistribution | null>(null);
    const [statistics, setStatistics] = useState<Statistics | null>(null);
    const [reviewsAreLoading, setReviewsAreLoading] = useState<boolean>(true);

    const router = useRouter();
    const perPage = 15;
    const destinationID = props.destination.id;

    const refreshData = async (page: number) => {
        setReviewsAreLoading(true);
        const refreshedData = await _RefreshData({ destinationID, perPage, router, page });
        if (!refreshedData) return;

        const { reviews, paginationProperties } = refreshedData;
        setPaginationProperties(paginationProperties);
        setReviews(reviews);

        setReviewsAreLoading(false);
    };

    // Prefetch data
    useEffect(() => {
        let isMounted = true;
        (async () => {
            const prefetchedData = await PrefetchData({ destinationID, perPage, router });
            if (!prefetchedData) return;
            const { reviews, paginationProperties, pointsDistribution, statistics } = prefetchedData;

            if (isMounted) {
                setReviewsAreLoading(false);
                setPaginationProperties(paginationProperties);
                setReviews(reviews);
                setPointsDistribution(pointsDistribution);
                setStatistics(statistics);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [props.destination, router, router.query, destinationID]);

    return (
        <Wrapper id="reviews-wrapper">
            {(() => {
                if (!statistics || !pointsDistribution || !paginationProperties) {
                    return <Loading></Loading>;
                } else {
                    return (
                        <>
                            <Landing
                                destination={props.destination} //
                                statistics={statistics}
                                pointsDistribution={pointsDistribution}
                            ></Landing>

                            <Sort refreshData={refreshData}></Sort>

                            <Reviews
                                reviews={reviews} //
                                paginationProperties={paginationProperties}
                                slug={props.destination.slug}
                                reviewsAreLoading={reviewsAreLoading}
                            ></Reviews>

                            <Pagination
                                paginationProperties={paginationProperties} //
                                scrollToElement="reviews-wrapper"
                                callbackDuringScrolling={(pageNumber: number) => {
                                    refreshData(pageNumber);
                                }}
                            ></Pagination>
                        </>
                    );
                }
            })()}
        </Wrapper>
    );
};

export default Content;
