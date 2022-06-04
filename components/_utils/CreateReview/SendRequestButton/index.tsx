// Tools
import axios from "axios";
import { useMemo } from "react";
import { styled } from "@mui/system";
import useNewReviewValidator from "./useNewReviewValidator";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { Review, ModifiedReviewResponse } from "@/@types/pages/api/ReviewsAPI";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Other components
import Link from "next/link";
import DeleteReviewButton from "./DeleteReviewButton";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { displaySnackbar } from "@/redux/slices/snackbar";
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
    fontSize: "1.2rem",
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
}

const SendRequestButton: FunctionComponent<SendRequestButtonProps> = (props) => {
    const { reviewContent, tags, reviewToModify, scoreInt, scoreFloat } = props;
    const { isAuthenticated } = useAppSelector((state) => state.authentication);

    const { actualScore, buttonIsDisabled } = useNewReviewValidator({
        isAuthenticated: isAuthenticated ?? false,
        reviewContent: props.reviewContent,
        reviewToModify: props.reviewToModify.value,
        scoreFloat: props.scoreFloat,
        scoreInt: props.scoreInt,
        tags: props.tags,
    });

    const dispatch = useAppDispatch();

    const sendRequest = async () => {
        if (!isAuthenticated || buttonIsDisabled) return;

        if (reviewToModify.value === null) {
            // Create a new review
            try {
                const { data }: { data: Review } = await axios.post(`/api/${props.record.type}/${props.record.id}/reviews`, {
                    points: actualScore,
                    reviewContent,
                    tags,
                });

                dispatch(
                    displaySnackbar({
                        msg: "Review has been created successfully",
                        severity: "success",
                        hideAfter: 3000,
                    })
                );

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
                setTimeout(props.showAuthenticatedUserReview, 1);
            } catch (e: unknown) {
                dispatch(
                    displaySnackbar({
                        msg: "Something went wrong",
                        severity: "error",
                        hideAfter: 3000,
                    })
                );
            }
        } else {
            // Update existing review
            try {
                const res = await axios.patch(`/api/${props.record.type}/${props.record.id}/reviews/${reviewToModify.value.id}`, {
                    points: actualScore,
                    reviewContent,
                    tags,
                });
                const data: ModifiedReviewResponse = res.data;

                reviewToModify.setValue((_current) => {
                    const value = _current as unknown as Review;
                    value.points = data.points;
                    value.type = data.type;
                    value.review = data.review;
                    value.tags = data.tags as any;
                    return value;
                });
                setTimeout(props.showAuthenticatedUserReview, 1);

                dispatch(
                    displaySnackbar({
                        msg: "Review has been updated successfully",
                        severity: "success",
                        hideAfter: 3000,
                    })
                );
            } catch (e: unknown) {
                dispatch(
                    displaySnackbar({
                        msg: "Something went wrong",
                        severity: "error",
                        hideAfter: 3000,
                    })
                );
            }
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
                    reviewId={reviewToModify.value.id}
                />
            )}
        </SendRequestButtonWrapper>
    );
};

export default SendRequestButton;
