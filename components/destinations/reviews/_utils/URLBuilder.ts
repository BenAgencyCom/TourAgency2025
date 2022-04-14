// Tools
import { isOrderOK, isScoreTypeOK, translateOrder } from "@/utils/client/reviewsSortingHelpers";
// Types
import type { Order } from "@/@types/SortReviews";
import type { NextRouter } from "next/router";

interface CreateRequestURLParams {
    destinationId: string;
    perPage: number;
    page?: number;
    order?: any; // Order
    type?: any; // ScoreType
    pointsDistribution?: boolean;
}

export const CreateRequestURL = (props: CreateRequestURLParams): string => {
    const { destinationId, perPage, page, order, type, pointsDistribution } = props;
    // Queries
    const pagination = `page=${page}&perPage=${perPage}`;
    const certianReviewType = isScoreTypeOK(type) ? `certianReviewType=${type}` : "";
    const points = pointsDistribution ? "applyPointsDistribution=1" : "";
    const applyOrder = isOrderOK(order) ? translateOrder(order as Order) : "";

    return `/api/destination/${destinationId}/reviews?${[pagination, points, certianReviewType, applyOrder].join("&")}`;
};

export const UpdateCurrentURLsQueries = (router: NextRouter) => {
    if (window && window.history) {
        const baseURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
        // Queries
        const page = router.query.page ? `page=${router.query.page}` : "";
        const order = isOrderOK(router.query.order) ? `order=${router.query.order}` : "";
        const type = isScoreTypeOK(router.query.type) ? `type=${router.query.type}` : "";

        const updatedURL = `${baseURL}?${[page, order, type].join("&")}`;
        window.history.pushState({ path: updatedURL }, "", updatedURL);
    }
};
