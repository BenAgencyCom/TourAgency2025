// Tools
import { createContext } from "react";
// Types
import type { StatedDataField } from "@/@types/StatedDataField";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { Review, PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";

export type BulkReviewsProps = Omit<BulkReviewsContextData, "fetchingResult">;

export interface BulkReviewsContextData {
    /** Either `landmark.id` or `destination.id` */
    idOfReviewingItem: string;
    reviewsType: "landmark" | "destination";
    landingScreen: {
        header: string;
        description: string;
        breadcrumbs: string[];
        /** Either `destination.slug` or `landmark.slug` */
        slug: string;
        /** Thumbnail image folder name */
        folder: string;
    };
    /**
     * All the data which had come as an API response
     */
    fetchingResult: {
        reviews: StatedDataField<Review[]>;
        pinnedReview: StatedDataField<Review | null>;
        statistics: StatedDataField<Statistics | null>;
        authenticatedUserReview: StatedDataField<Review | null>;
        pointsDistribution: StatedDataField<PointsDistribution | null>;
        paginationProperties: StatedDataField<PaginationProperties | null>;
    };
}

export const BulkReviewsContext = createContext<BulkReviewsContextData>({} as any);
