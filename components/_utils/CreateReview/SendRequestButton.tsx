// Tools
import { useMemo } from "react";
import { styled } from "@mui/system";
import restrictions from "@/utils/restrictions/createReview";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Other components
import Link from "next/link";
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
    reviewToModify: Review | null;
}

const SendRequestButton: FunctionComponent<SendRequestButtonProps> = (props) => {
    const { reviewContent, tags, reviewToModify, scoreInt, scoreFloat } = props;
    const { isAuthenticated } = useAppSelector((state) => state.authentication);

    const actualScore = useMemo<number>(() => {
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
        if (!reviewToModify) return false;
        return actualScore === reviewToModify.points;
    }, [actualScore, reviewToModify]);

    const tagsHaveNotBeenChanged = useMemo<boolean>(() => {
        if (!reviewToModify) return false;
        return JSON.stringify(tags) === JSON.stringify(reviewToModify.tags);
    }, [tags, reviewToModify]);

    const reviewContentHasNotBeenChanged = useMemo<boolean>(() => {
        if (!reviewToModify) return false;
        return reviewContent === reviewToModify.review;
    }, [reviewContent, reviewToModify]);

    return (
        <SendRequestButtonWrapper>
            <StyledButton
                primary //
                sx={{ width: "200px", mr: "20px" }}
                disabled={!isAuthenticated || reviewContentIsNotOK || tagsAreNotOK || (scoreHasNotBeenChanged && tagsHaveNotBeenChanged && reviewContentHasNotBeenChanged)}
            >
                {reviewToModify ? "Modify review" : "Add review"}
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
