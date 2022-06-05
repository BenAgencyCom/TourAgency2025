// Tools
import axios from "axios";
// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { DisplaySnackbarParams } from "@/redux/slices/snackbar";

interface HandleCreateRequestParams {
    tags: string[];
    actualScore: number;
    reviewContent: string;
    showAuthenticatedUserReview: () => void;
    reviewToModify: StatedDataField<Review | null>;
    record: {
        id: string;
        type: "landmark" | "destination";
    };
    displaySnackbar: (params: DisplaySnackbarParams) => void;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default async (params: HandleCreateRequestParams) => {
    const { reviewToModify, record } = params;

    const { data }: { data: Review } = await axios.post(`/api/${record.type}/${record.id}/reviews`, {
        points: params.actualScore,
        reviewContent: params.reviewContent,
        tags: params.tags,
    });

    reviewToModify.setValue({
        createdAt: data.createdAt,
        feedback: data.feedback,
        id: data.id,
        points: data.points,
        review: data.review,
        reviewer: data.reviewer,
        tags: data.tags,
        type: data.type,
    });

    setTimeout(params.showAuthenticatedUserReview, 1);

    params.displaySnackbar({
        msg: "Review has been created successfully",
        severity: "success",
        hideAfter: 3000,
    });
};
