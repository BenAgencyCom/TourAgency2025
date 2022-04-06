// Tools
import { isOrderOK, isTypeOK } from "./_validators";
// Types
import type { ChosenOrder } from "../@types";
import type { NextRouter } from "next/router";

interface CreateRequestURLParams {
    destinationId: string;
    perPage: number;
    page?: number;
    order?: any; // ChosenOrder
    type?: any; // ChosenType
    pointsDistribution?: boolean;
}

const translateOrder = (order: ChosenOrder): string => {
    const possibilites: Record<ChosenOrder, string> = {
        best: "orderBy=points&sort=desc",
        worst: "orderBy=points&sort=asc",
        newest: "orderBy=createdAt&sort=desc",
        oldest: "orderBy=createdAt&sort=asc",
    };

    return possibilites[order];
};

export const CreateRequestURL = (props: CreateRequestURLParams): string => {
    const { destinationId, perPage, page, order, type, pointsDistribution } = props;
    // Queries
    const pagination = `page=${page}&perPage=${perPage}`;
    const certianReviewType = isTypeOK(type) ? `certianReviewType=${type}` : "";
    const points = pointsDistribution ? "applyPointsDistribution=1" : "";
    const applyOrder = isOrderOK(order) ? translateOrder(order as ChosenOrder) : "";

    return `/api/destination/${destinationId}/reviews?${[pagination, points, certianReviewType, applyOrder].join("&")}`;
};

export const UpdateCurrentURLsQueries = (router: NextRouter) => {
    if (window && window.history) {
        const baseURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
        // Queries
        const page = router.query.page ? `page=${router.query.page}` : "";
        const order = isOrderOK(router.query.order) ? `order=${router.query.order}` : "";
        const type = isTypeOK(router.query.type) ? `type=${router.query.type}` : "";

        const updatedURL = `${baseURL}?${[page, order, type].join("&")}`;
        window.history.pushState({ path: updatedURL }, "", updatedURL);
    }
};
