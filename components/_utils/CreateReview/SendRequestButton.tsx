// Tools
import axios from "axios";
import { useMemo } from "react";
import { styled } from "@mui/system";
import restrictions from "@/utils/restrictions/createReview";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { Review, ModifiedReviewResponse } from "@/@types/pages/api/ReviewsAPI";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Other components
import Link from "next/link";
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

    const actualScore = useMemo<number>(() => {
        if (scoreInt === 10) return 10;
        return (scoreInt * 10 + scoreFloat) / 10;
    }, [scoreFloat, scoreInt]);

    const reviewContentIsNotOK = useMemo<boolean>(() => {
        const { min, max } = restrictions.content;
        const { length } = reviewContent;
        return length > max || length < min;
    }, [reviewContent]);

    const tagsAreNotOK = useMemo<boolean>(() => {
        const { min, max } = restrictions.tagsInGeneral;
        const { length: amountOfTags } = tags;
        return amountOfTags > max || amountOfTags < min;
    }, [tags]);

    const scoreHasNotBeenChanged = useMemo<boolean>(() => {
        if (!reviewToModify.value) return false;
        return actualScore === reviewToModify.value.points;
    }, [actualScore, reviewToModify]);

    const tagsHaveNotBeenChanged = useMemo<boolean>(() => {
        if (!reviewToModify.value) return false;
        return JSON.stringify(tags) === JSON.stringify(reviewToModify.value.tags);
    }, [tags, reviewToModify]);

    const reviewContentHasNotBeenChanged = useMemo<boolean>(() => {
        if (!reviewToModify.value) return false;
        return reviewContent === reviewToModify.value.review;
    }, [reviewContent, reviewToModify]);

    const buttonIsDisabled = useMemo<boolean>(() => {
        return !isAuthenticated || reviewContentIsNotOK || tagsAreNotOK || (scoreHasNotBeenChanged && tagsHaveNotBeenChanged && reviewContentHasNotBeenChanged);
    }, [isAuthenticated, reviewContentHasNotBeenChanged, reviewContentIsNotOK, scoreHasNotBeenChanged, tagsAreNotOK, tagsHaveNotBeenChanged]);

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
        </SendRequestButtonWrapper>
    );
};

export default SendRequestButton;
