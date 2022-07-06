// Tools
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import useWindowSizes from "@/hooks/useWindowSizes";
import useBulkReviewsContext from "./useBulkReviewsContext";
// Types
interface UseDataQueryHandlerResult {
    isLoading: boolean;
    queryForData: (urlQueryString: string) => Promise<void>;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (): UseDataQueryHandlerResult => {
    const router = useRouter();
    const { width } = useWindowSizes();
    const context = useBulkReviewsContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const queryForData = useCallback(
        async (urlQueries: string) => {
            // Computed values
            const applyPointsDistribution: boolean = (() => {
                return !context.fetchingResult.statistics.value || !context.fetchingResult.pointsDistribution.value;
            })();
            const reviewsPerPage: number = width > 800 ? 12 : 8;

            try {
                setIsLoading(true);
                const { reviewsType, idOfReviewingItem } = context;

                const res = await axios.get(`/api/${reviewsType}/${idOfReviewingItem}/reviews${urlQueries}&perPage=${reviewsPerPage}${applyPointsDistribution ? "&applyPointsDistribution=1" : ""} `);
                if (res.data) {
                    const { pagination, reviews, pointsDistribution, statistics, pinnedReview, authenticatedUserReview } = res.data;

                    setIsLoading(false);
                    context.fetchingResult.reviews.setValue(reviews);
                    context.fetchingResult.paginationProperties.setValue(pagination);

                    if (statistics) context.fetchingResult.statistics.setValue(statistics);
                    if (pinnedReview) context.fetchingResult.pinnedReview.setValue(pinnedReview);
                    if (pointsDistribution) context.fetchingResult.pointsDistribution.setValue(pointsDistribution);
                    if (authenticatedUserReview) context.fetchingResult.authenticatedUserReview.setValue(authenticatedUserReview);
                }
            } catch (e: unknown) {
                router.push("/500");
            }
        },
        [context, router, width]
    );

    return { isLoading, queryForData };
};
