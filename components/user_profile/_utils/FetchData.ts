// Tools
import axios from "axios";
import { CreateRequestURL } from "./URLBuilder";
// Types
import type { NextRouter } from "next/router";
import type { ReviewingType } from "@/@types/SortReviews";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { LandmarkReview, DestinationReview } from "@/@types/pages/UserProfile";

interface RefreshDataParams {
    userID: string;
    perPage: number;
    router: NextRouter;
}
interface RefreshDataResponse {
    reviews: LandmarkReview[] | DestinationReview[];
    paginationProperties: PaginationProperties;
    fetchedReviewsType: ReviewingType;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (params: RefreshDataParams): Promise<RefreshDataResponse | false> => {
    try {
        const URL = CreateRequestURL(params);
        const { data } = await axios.get(URL);
        return {
            reviews: data.reviews,
            paginationProperties: data.pagination,
            fetchedReviewsType: (params.router.query.reviewingType as ReviewingType) ?? "landmark",
        };
    } catch (e: any) {
        params.router.push("/500");
        return false;
    }
};
