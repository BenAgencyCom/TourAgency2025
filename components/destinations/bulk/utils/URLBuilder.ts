// Tools
import { isOrderOK, translateOrder, isContinentOK } from "@/utils/client/reviewsSortingHelpers";
// Types
import type { Order } from "@/@types/SortReviews";
import type { NextRouter } from "next/router";

interface CreateRequestURLParams {
    perPage: number;
    page?: number;
    searchingPhrase?: string;
    continent?: string;
    order?: any; // Order
    type?: any; // ScoreType
}

export const CreateRequestURL = (props: CreateRequestURLParams): string => {
    const { perPage, page, order } = props;
    // Queries
    const pagination = `page=${page}&perPage=${perPage}`;
    const applyOrder = isOrderOK(order) ? translateOrder(order as Order) : "";

    return `/api/destination/bulk?${[pagination, applyOrder].join("&")}`;
};

export const UpdateCurrentURLsQueries = (router: NextRouter) => {
    if (window && window.history) {
        const baseURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
        // Queries
        const page = router.query.page ? `page=${router.query.page}` : "";
        const order = isOrderOK(router.query.order) ? `order=${router.query.order}` : "";
        const continent = isContinentOK(router.query.continent) ? `continent=${router.query.continent}` : "";
        const searching = router.query.searchingPhrase ? `searchingPhrase=${router.query.searchingPhrase}` : "";

        const updatedURL = `${baseURL}?${[page, order, continent, searching].join("&")}`;
        window.history.pushState({ path: updatedURL }, "", updatedURL);
    }
};
