// Tools
import { styled } from "@mui/system";
import useSnackbar from "@/hooks/useSnackbar";
import handleCreateRequest from "./requests/create";
import handleUpdateRequest from "./requests/update";
import useNewReviewValidator from "./useNewReviewValidator";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { StatedDataField } from "@/@types/StatedDataField";
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
    tags: string[];
    scoreInt: number;
    scoreFloat: number;
    reviewContent: string;
    showAuthenticatedUserReview: () => void;
    reviewToModify: StatedDataField<Review | null>;
    record: {
        id: string;
        type: "landmark" | "destination";
    };
    resetCreateReviewFields: () => void;
}

const SendRequestButton: FunctionComponent<SendRequestButtonProps> = (props) => {
    const { reviewContent, tags, reviewToModify, showAuthenticatedUserReview, record } = props;
    const { isAuthenticated } = useAppSelector((state) => state.authentication);
    const displaySnackbar = useSnackbar();

    const { actualScore, buttonIsDisabled } = useNewReviewValidator({
        isAuthenticated: isAuthenticated ?? false,
        reviewContent: props.reviewContent,
        reviewToModify: props.reviewToModify.value,
        scoreFloat: props.scoreFloat,
        scoreInt: props.scoreInt,
        tags: props.tags,
    });

    const displaySomethingWentWrongMsg = () => {
        displaySnackbar({
            msg: "Something went wrong",
            severity: "error",
            hideAfter: 3000,
        });
    };

    const sendRequest = async () => {
        if (!isAuthenticated || buttonIsDisabled) return;

        if (reviewToModify.value === null) {
            await handleCreateRequest({
                tags,
                record,
                actualScore,
                reviewContent,
                displaySnackbar,
                showAuthenticatedUserReview,
                reviewToModify: reviewToModify as any,
            });
        } else {
            // Update existing review
            await handleUpdateRequest({
                tags,
                record,
                actualScore,
                reviewContent,
                displaySnackbar,
                showAuthenticatedUserReview,
                reviewToModify: reviewToModify as any,
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
                {reviewToModify.value ? "Modify review" : "Add review"}
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
            {reviewToModify.value && (
                <DeleteReviewButton
                    record={props.record} //
                    reviewToModify={reviewToModify}
                    resetCreateReviewFields={props.resetCreateReviewFields}
                />
            )}
        </SendRequestButtonWrapper>
    );
};

export default SendRequestButton;
