// Tools
import axios from "axios";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// Types
import type { FunctionComponent } from "react";
import type { Landmark } from "@/@types/pages/landmarks/Reviews";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { Review, PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Other components
import Landing from "./Landing";
import Reviews from "./Reviews";
import URLQueriesManager from "@/components/_utils/URLQueriesManager";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
const PinnedReview = dynamic(() => import("./PinnedReview"));
// Material UI Icons
import Star from "@mui/icons-material/Star";
// Styled components
import ContentContainter from "@/components/_utils/styled/ContentContainter";
import SingleReviewSkeletonLoading from "@/components/_utils/SingleReview/SkeletonLoading";

interface ContentParams {
    landmark: Landmark;
}
const Content: FunctionComponent<ContentParams> = (props) => {
    const REVIEWS_PER_PAGE = 12;

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [statistics, setStatistics] = useState<Statistics | null>(null);
    const [pointsDistribution, setPointsDistribution] = useState<PointsDistribution | null>(null);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);
    const [pinnedReview, setPinnedReview] = useState<Review | null>(null);

    const router = useRouter();

    const queryForData = async (urlQueries: string) => {
        const landmarkID = props.landmark.id;

        try {
            setLoading(true);
            const applyPointsDistribution = !statistics || !pointsDistribution;
            const res = await axios.get(`/api/landmark/${landmarkID}/reviews${urlQueries}&perPage=${REVIEWS_PER_PAGE}${applyPointsDistribution ? "&applyPointsDistribution=1" : ""} `);
            if (res.data) {
                const { pagination, reviews, pointsDistribution, statistics, pinnedReview } = res.data;
                setLoading(false);
                setReviews(reviews);
                setPaginationProperties(pagination);

                if (statistics) setStatistics(statistics);
                if (pinnedReview) setPinnedReview(pinnedReview);
                if (pointsDistribution) setPointsDistribution(pointsDistribution);
            }
        } catch (e: unknown) {
            router.push("/500");
        }
    };

    return (
        <ContentContainter id="single-landmark-reviews" backgroundMap>
            <Landing
                landmark={props.landmark} //
                statistics={statistics}
                pointsDistribution={pointsDistribution}
            ></Landing>

            <PinnedReview review={pinnedReview}></PinnedReview>

            <URLQueriesManager
                queryForData={queryForData}
                disableResultsInTotal
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
                              idOfElementToScrollTo: "single-landmark-reviews",
                          }
                        : undefined
                }
                otherURLQueries={["pinnedReviewId"]}
            >
                {(() => {
                    if (loading || !statistics || !pointsDistribution || !paginationProperties) {
                        return (
                            <>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
                                <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
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
