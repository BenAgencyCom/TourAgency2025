// Tools
import axios from "axios";
// Types
import type { StatedDataField } from "@/@types/StatedDataField";
import type { DisplaySnackbarParams } from "@/redux/slices/snackbar";
import type { Review, ModifiedReviewResponse } from "@/@types/pages/api/ReviewsAPI";

interface HandleUpdateRequestParams {
    tags: string[];
    actualScore: number;
    reviewContent: string;
    showAuthenticatedUserReview: () => void;
    authenticatedUserReview: StatedDataField<Review>;
    record: {
        id: string;
        type: "landmark" | "destination";
    };
    displaySnackbar: (params: DisplaySnackbarParams) => void;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default async (params: HandleUpdateRequestParams) => {
    try {
        const { authenticatedUserReview, record } = params;

        const res = await axios.patch(`/api/${record.type}/${record.id}/reviews/${authenticatedUserReview.value.id}`, {
            points: params.actualScore,
            reviewContent: params.reviewContent,
            tags: params.tags,
        });
        const data: ModifiedReviewResponse = res.data;

        authenticatedUserReview.setValue((_current) => {
            const value = _current as unknown as Review;
            value.points = data.points;
            value.type = data.type;
            value.review = data.review;
            value.tags = data.tags as any;
            return value;
        });
        setTimeout(params.showAuthenticatedUserReview, 1);

        params.displaySnackbar({
            msg: "Review has been updated successfully",
            severity: "success",
            hideAfter: 3000,
        });
    } catch (e: unknown) {
        params.displaySnackbar({
            msg: "Something went wrong",
            severity: "error",
            hideAfter: 3000,
        });
    }
};
