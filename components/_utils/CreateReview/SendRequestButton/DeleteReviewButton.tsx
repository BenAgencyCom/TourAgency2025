// Tools
import { useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import handleDeleteRequest from "./requests/delete";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Styled components
import { StyledDialogBase, StyledDialogTitle, StyledDialogActions, StyledDialogContent } from "@/components/create/_utils/styled_components/Dialog";
import StyledButton from "@/components/create/_utils/forms/Button";

interface DeleteReviewButtonProps {
    record: {
        id: string;
        type: "landmark" | "destination";
    };
    reviewToModify: StatedDataField<Review | null>;
    resetCreateReviewFields: () => void;
}

const DeleteReviewButton: FunctionComponent<DeleteReviewButtonProps> = (props) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const displaySnackbar = useSnackbar();

    const onContinueButtonClick = async () => {
        if (props.reviewToModify.value === null) return;
        //
        await handleDeleteRequest({
            displaySnackbar,
            record: props.record,
            reviewToModify: props.reviewToModify,
            resetCreateReviewFields: props.resetCreateReviewFields,
        });
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
