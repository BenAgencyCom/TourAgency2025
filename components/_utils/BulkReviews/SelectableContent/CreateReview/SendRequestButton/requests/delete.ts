// Tools
import axios from "axios";
// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { DisplaySnackbarParams } from "@/redux/slices/snackbar";

interface DeleteRequestParams {
    resetCreateReviewFields: () => void;
    pinnedReview: StatedDataField<Review | null>;
    authenticatedUserReview: StatedDataField<Review | null>;
    record: {
        id: string;
        type: "landmark" | "destination";
    };
    displaySnackbar: (params: DisplaySnackbarParams) => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (params: DeleteRequestParams) => {
    try {
        const { record, authenticatedUserReview, pinnedReview } = params;

        if (authenticatedUserReview.value === null) return;
        await axios.delete(`/api/${record.type}/${record.id}/reviews/${authenticatedUserReview.value.id}`);

        // Set pinned review to null when authenticated user's review was pinned
        if (authenticatedUserReview.value && pinnedReview.value) {
            if (authenticatedUserReview.value.id === pinnedReview.value.id) {
                pinnedReview.setValue(null);
            }
        }
        authenticatedUserReview.setValue(null);

        params.displaySnackbar({
            msg: "Review has been deleted successfully",
            severity: "success",
            hideAfter: 3000,
        });

        params.resetCreateReviewFields();
    } catch (e: unknown) {
        params.displaySnackbar({
            msg: "Something went wrong",
            severity: "error",
            hideAfter: 3000,
        });
    }
};
