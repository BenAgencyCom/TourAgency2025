// Tools
import { useState } from "react";
import stated from "@/utils/client/stated";
import { BulkReviewsContext } from "./context";
// Types
import type { FunctionComponent } from "react";
import type { BulkReviewsProps } from "./context";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { Review, PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";

const BulkReviewsContextProvider: FunctionComponent<BulkReviewsProps> = (props) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [statistics, setStatistics] = useState<Statistics | null>(null);
    const [pinnedReview, setPinnedReview] = useState<Review | null>(null);
    const [pointsDistribution, setPointsDistribution] = useState<PointsDistribution | null>(null);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);
    const [authenticatedUserReview, setAuthenticatedUserReview] = useState<Review | null>(null);

    return (
        <BulkReviewsContext.Provider
            value={{
                ...props,
                fetchingResult: {
                    authenticatedUserReview: stated(authenticatedUserReview, setAuthenticatedUserReview),
                    paginationProperties: stated(paginationProperties, setPaginationProperties),
                    pointsDistribution: stated(pointsDistribution, setPointsDistribution),
                    pinnedReview: stated(pinnedReview, setPinnedReview),
                    statistics: stated(statistics, setStatistics),
                    reviews: stated(reviews, setReviews),
                },
            }}
        >
            {props.children}
        </BulkReviewsContext.Provider>
    );
};

export default BulkReviewsContextProvider;
