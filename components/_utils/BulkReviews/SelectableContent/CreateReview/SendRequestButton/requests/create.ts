// Tools
import axios from "axios";
import moment from "moment";
// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { DisplaySnackbarParams } from "@/redux/slices/snackbar";

interface HandleCreateRequestParams {
    tags: string[];
    actualScore: number;
    reviewContent: string;
    showAuthenticatedUserReview: () => void;
    authenticatedUserReview: StatedDataField<Review | null>;
    record: {
        id: string;
        type: "landmark" | "destination";
    };
    displaySnackbar: (params: DisplaySnackbarParams) => void;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default async (params: HandleCreateRequestParams) => {
    try {
        const { authenticatedUserReview, record } = params;

        const { data }: { data: Review } = await axios.post(`/api/${record.type}/${record.id}/reviews`, {
            points: params.actualScore,
            reviewContent: params.reviewContent,
            tags: params.tags,
        });

        authenticatedUserReview.setValue({
            createdAt: moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss"),
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
    } catch (e: unknown) {
        params.displaySnackbar({
            msg: "Something went wrong",
            severity: "error",
            hideAfter: 3000,
        });
    }
};
