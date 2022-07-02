// Tools
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import useWindowSizes from "@/hooks/useWindowSizes";
// Types
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/destinations/Reviews";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { Review, PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Other components
import Landing from "./Landing";
import Reviews from "./Reviews";
import URLQueriesManager from "@/components/_utils/URLQueriesManager";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
// Material UI Icons
import Star from "@mui/icons-material/Star";
// Styled components
import ContentContainter from "@/components/_utils/styled/ContentContainter";
import SingleReviewSkeletonLoading from "@/components/_utils/SingleReview/SkeletonLoading";

interface ContentParams {
    destination: Destination;
}
const Content: FunctionComponent<ContentParams> = (props) => {
    const { width } = useWindowSizes();

    const REVIEWS_PER_PAGE = width > 800 ? 12 : 8;

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [statistics, setStatistics] = useState<Statistics | null>(null);
    const [pointsDistribution, setPointsDistribution] = useState<PointsDistribution | null>(null);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);

    const router = useRouter();

    const queryForData = async (urlQueries: string) => {
        const destinationID = props.destination.id;

        try {
            setLoading(true);
            const applyPointsDistribution = !statistics || !pointsDistribution;
            const res = await axios.get(`/api/destination/${destinationID}/reviews${urlQueries}&perPage=${REVIEWS_PER_PAGE}${applyPointsDistribution ? "&applyPointsDistribution=1" : ""} `);
            if (res.data) {
                const { pagination, reviews, pointsDistribution, statistics } = res.data;

                setLoading(false);
                setReviews(reviews);
                setPaginationProperties(pagination);

                if (statistics) setStatistics(statistics);
                if (pointsDistribution) setPointsDistribution(pointsDistribution);
            }
        } catch (e: unknown) {
            router.push("/500");
        }
    };

    return (
        <ContentContainter id="single-destination-reviews" backgroundMap>
            <Landing
                destination={props.destination} //
                statistics={statistics}
                pointsDistribution={pointsDistribution}
            ></Landing>

            <URLQueriesManager
                queryForData={queryForData}
                disableResultsInTotal
                lineAnimationColor="paperDefault"
                extraOrderOptions={[
                    {
                        label: "Best score",
                        value: "best",
                        "data-compounded-value": "orderBy=points&sort=desc",
                    },
                    {
                        label: "Worst score",
                        value: "worst",
                        "data-compounded-value": "orderBy=points&sort=asc",
                    },
                ]}
                extraSelects={[
                    {
                        key: "certianReviewType",
                        icon: <Star />,
                        options: [
                            { label: "All types", value: "all" },
                            { label: "Positive", value: "POSITIVE" },
                            { label: "Negative", value: "NEGATIVE" },
                            { label: "Mixed", value: "MIXED" },
                        ],
                        defaultValue: "all",
                        omitIfDeafult: true,
                    },
                ]}
                paginationProperties={
                    paginationProperties && !loading
                        ? {
                              ...paginationProperties,
                              idOfElementToScrollTo: "single-destination-reviews",
                          }
                        : undefined
                }
            >
                {(() => {
                    if (loading || !statistics || !pointsDistribution || !paginationProperties) {
                        return (
                            <>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
                            </>
                        );
                    } else {
                        if (reviews.length === 0) {
                            return (
                                <ThereAreNoResults
                                    router={router} //
                                    header="There are no reviews"
                                ></ThereAreNoResults>
                            );
                        } else {
                            return (
                                <Reviews
                                    reviews={reviews} //
                                    paginationProperties={paginationProperties}
                                    reviewsAreLoading={loading}
                                ></Reviews>
                            );
                        }
                    }
                })()}
            </URLQueriesManager>
        </ContentContainter>
    );
};

export default Content;
