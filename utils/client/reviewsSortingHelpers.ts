// Types
import type { Order, ScoreType, ReviewingType } from "@/@types/SortReviews";

export const translateOrder = (order: Order): string => {
    const possibilites: Record<Order, string> = {
        best: "orderBy=points&sort=desc",
        worst: "orderBy=points&sort=asc",
        newest: "orderBy=createdAt&sort=desc",
        oldest: "orderBy=createdAt&sort=asc",
    };

    return possibilites[order];
};

export const isReviewingTypeOK = (reviewingType?: any): boolean => {
    return (reviewingType && ["landmark", "destination"].includes(reviewingType)) as boolean;
};

export const isScoreTypeOK = (scoreType?: any): boolean => {
    return (scoreType && scoreType !== "all" && ["POSITIVE", "NEGATIVE", "MIXED"].includes(scoreType)) as boolean;
};

export const isOrderOK = (order?: any): boolean => {
    return (order && ["newest", "oldest", "best", "worst"].includes(order)) as boolean;
};

/**
 * The only parameter is value of `router.query.scoreType`
 *
 * In order to make function more reusable the value is expected instead of `router` instance
 * due to the fact that property's name might vary in different places.
 */
export const getDefaultScoreType = (value: any): ScoreType => {
    return isScoreTypeOK(value) ? value : "all";
};
/**
 * The only parameter is value of `router.query.reviewingType`
 *
 * In order to make function more reusable the value is expected instead of `router` instance
 * due to the fact that property's name might vary in different places.
 */
export const getDefaultReviewingType = (value: any): ReviewingType => {
    return isReviewingTypeOK(value) ? value : "landmark";
};
/**
 * The only parameter is value of `router.query.order`
 *
 * In order to make function more reusable the value is expected instead of `router` instance
 * due to the fact that property's name might vary in different places.
 */
export const getDefaultOrder = (value: any): Order => {
    return isOrderOK(value) ? value : "newest";
};
