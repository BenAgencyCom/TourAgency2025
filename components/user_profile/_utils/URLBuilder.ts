// Tools
import { isOrderOK, isScoreTypeOK, translateOrder, isReviewingTypeOK } from "@/utils/client/reviewsSortingHelpers";
// Types
import type { Order } from "@/@types/SortReviews";
import type { NextRouter } from "next/router";

export const UpdateCurrentURLsQueries = (router: NextRouter) => {
    if (window && window.history) {
        const baseURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
        // Queries
        const page = router.query.page ? `page=${router.query.page}` : "";
        const order = isOrderOK(router.query.order) ? `order=${router.query.order}` : "";
        const scoreType = isScoreTypeOK(router.query.scoreType) ? `scoreType=${router.query.scoreType}` : "";
        const reviewingType = isReviewingTypeOK(router.query.reviewingType) ? `reviewingType=${router.query.reviewingType}` : "";

        const updatedURL = `${baseURL}?${[page, order, scoreType, reviewingType].join("&")}`;
        window.history.pushState({ path: updatedURL }, "", updatedURL);
    }
};

interface CreateRequestURLParams {
    userID: string;
    perPage: number;
    router: NextRouter;
}

export const CreateRequestURL = (props: CreateRequestURLParams): string => {
    const { userID, perPage } = props;
    const { scoreType, reviewingType, order, page } = props.router.query;
    // Queries
    const pagination = `page=${page ?? 1}&perPage=${perPage}`;
    const certianReviewType = isScoreTypeOK(scoreType) ? `certianReviewType=${scoreType}` : "";
    const type = isReviewingTypeOK(reviewingType) ? `type=${reviewingType}` : "type=landmark";
    const applyOrder = isOrderOK(order) ? translateOrder(order as Order) : "";

    return `/api/user/${userID}/reviews?${[type, pagination, certianReviewType, applyOrder].join("&")}`;
};
