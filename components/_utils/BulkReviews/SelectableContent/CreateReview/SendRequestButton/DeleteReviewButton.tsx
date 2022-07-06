// Tools
import { useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import handleDeleteRequest from "./requests/delete";
import useCreateReviewContext from "@/components/_utils/BulkReviews/SelectableContent/CreateReview/hooks/useCreateReviewContext";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";
import { StyledDialogBase, StyledDialogTitle, StyledDialogActions, StyledDialogContent } from "@/components/create/_utils/styled_components/Dialog";

interface DeleteReviewButtonProps {
    record: {
        id: string;
        type: "landmark" | "destination";
    };
    authenticatedUserReview: StatedDataField<Review | null>;
    pinnedReview: StatedDataField<Review | null>;
}

const DeleteReviewButton: FunctionComponent<DeleteReviewButtonProps> = (props) => {
    const displaySnackbar = useSnackbar();
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const { reviewContent, tags, scoreInt, scoreFloat } = useCreateReviewContext();

    const onContinueButtonClick = async () => {
        if (props.authenticatedUserReview.value === null) return;
        //
        await handleDeleteRequest({
            record: props.record,
            pinnedReview: props.pinnedReview,
            authenticatedUserReview: props.authenticatedUserReview,
            displaySnackbar,
            resetCreateReviewFields: resetCreateReviewFields,
        });
    };

    const resetCreateReviewFields = () => {
        tags.setValue([]);
        scoreInt.setValue(0);
        scoreFloat.setValue(0);
        reviewContent.setValue("");
    };

    return (
        <>
            <StyledButton onClick={() => setOpenDeleteDialog(true)}>Delete review</StyledButton>

            {/*  */}
            <StyledDialogBase open={openDeleteDialog}>
                <StyledDialogTitle>Confirmation</StyledDialogTitle>
                <StyledDialogContent>
                    Before going further please take into account that after deleting a review <strong>you will not be able to recover it</strong> so decide wisely
                </StyledDialogContent>
                <StyledDialogActions>
                    <StyledButton primary onClick={onContinueButtonClick}>
                        Continue
                    </StyledButton>
                    <StyledButton onClick={() => setOpenDeleteDialog(false)}>Cancel</StyledButton>
                </StyledDialogActions>
            </StyledDialogBase>
        </>
    );
};

export default DeleteReviewButton;
