// Tools
import { styled } from "@mui/system";
import useSnackbar from "@/hooks/useSnackbar";
import handleCreateRequest from "./requests/create";
import handleUpdateRequest from "./requests/update";
import useNewReviewValidator from "./useNewReviewValidator";
import useBulkReviewsContext from "@/components/_utils/BulkReviews/hooks/useBulkReviewsContext";
import useCreateReviewContext from "@/components/_utils/BulkReviews/SelectableContent/CreateReview/hooks/useCreateReviewContext";
// Types
import type { FunctionComponent } from "react";
// Other components
import Link from "next/link";
import DeleteReviewButton from "./DeleteReviewButton";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";

const SendRequestButtonWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginTop: "40px",
    ["@media (max-width:1100px)"]: {
        flexDirection: "column",
        alignItems: "flex-start",
        ">span": {
            marginTop: "10px",
        },
    },
    ["@media (max-width:500px)"]: {
        button: {
            width: "100% ",
        },
    },
}));

const AuthenticationMessage = styled("span")(({ theme }) => ({
    fontSize: "1.1rem",
    strong: {
        color: theme.palette.primary.main,
        cursor: "pointer",
    },
}));

interface SendRequestButtonProps {
    showAuthenticatedUserReview: () => void;
}

const SendRequestButton: FunctionComponent<SendRequestButtonProps> = (props) => {
    const displaySnackbar = useSnackbar();

    const { showAuthenticatedUserReview } = props;
    const { isAuthenticated } = useAppSelector((state) => state.authentication);
    const { reviewContent, tags, scoreInt, scoreFloat } = useCreateReviewContext();
    const { fetchingResult, idOfReviewingItem, reviewsType } = useBulkReviewsContext();

    const { authenticatedUserReview, pinnedReview } = fetchingResult;

    const { actualScore, buttonIsDisabled } = useNewReviewValidator({
        isAuthenticated: isAuthenticated ?? false,
        reviewContent: reviewContent.value,
        reviewToModify: authenticatedUserReview.value,
        scoreFloat: scoreFloat.value,
        scoreInt: scoreInt.value,
        tags: tags.value,
    });

    const record = {
        id: idOfReviewingItem,
        type: reviewsType,
    };

    const sendRequest = async () => {
        if (!isAuthenticated || buttonIsDisabled) return;

        if (authenticatedUserReview.value === null) {
            await handleCreateRequest({
                record,
                actualScore,
                displaySnackbar,
                tags: tags.value,
                showAuthenticatedUserReview,
                reviewContent: reviewContent.value,
                authenticatedUserReview: authenticatedUserReview,
            });
        } else {
            // Update existing review
            await handleUpdateRequest({
                record,
                actualScore,
                displaySnackbar,
                tags: tags.value,
                showAuthenticatedUserReview,
                reviewContent: reviewContent.value,
                authenticatedUserReview: authenticatedUserReview as any,
            });
        }
    };
    return (
        <SendRequestButtonWrapper>
            <StyledButton
                primary //
                sx={{ width: "200px", mr: "20px" }}
                disabled={buttonIsDisabled}
                onClick={sendRequest}
            >
                {authenticatedUserReview.value ? "Modify review" : "Add review"}
            </StyledButton>
            {!isAuthenticated && (
                <AuthenticationMessage>
                    <span>In order to create a review you have to </span>

                    <Link href="/login" passHref>
                        <strong>login</strong>
                    </Link>

                    <span>{`. Don't have an account? `}</span>
                    <strong>Create one </strong>
                </AuthenticationMessage>
            )}

            {authenticatedUserReview.value && (
                <DeleteReviewButton
                    record={record} //
                    authenticatedUserReview={authenticatedUserReview}
                    pinnedReview={pinnedReview}
                />
            )}
        </SendRequestButtonWrapper>
    );
};

export default SendRequestButton;
