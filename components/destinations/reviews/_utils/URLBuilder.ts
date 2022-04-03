// Tools
import { isOrderOK, isTypeOK } from "./_validators";
// Types
import type { ChosenOrder } from "../@types";

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
        best: "&orderBy=score&sort=desc",
        worst: "&orderBy=score&sort=asc",
        newest: "&orderBy=latest&sort=desc",
        oldest: "&orderBy=score&sort=asc",
    };

    return possibilites[order];
};

export const CreateRequestURL = (props: CreateRequestURLParams): string => {
    const { destinationId, perPage, page, order, type, pointsDistribution } = props;

    const pagination = `page=${page}&perPage=${perPage}`;
    const certianReviewType = isTypeOK(type) ? `&certianReviewType=${type}` : "";
    const points = pointsDistribution ? "&applyPointsDistribution=true" : "";
    const applyOrder = isOrderOK(order) ? translateOrder(order as ChosenOrder) : "";

    return `/api/destination/${destinationId}/reviews?${[pagination, points, certianReviewType, applyOrder].join("")}`;
};
