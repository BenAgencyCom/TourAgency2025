// Tools
import { useMemo } from "react";
import restrictions from "@/utils/restrictions/createReview";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";

interface SendRequestButtonProps {
    tags: string[];
    scoreInt: number;
    scoreFloat: number;
    reviewContent: string;
    reviewToModify: Review | null;
}

const SendRequestButton: FunctionComponent<SendRequestButtonProps> = (props) => {
    const { reviewContent, tags, reviewToModify, scoreInt, scoreFloat } = props;

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
        <StyledButton
            primary //
            sx={{ mt: "40px", width: "200px" }}
            disabled={reviewContentIsNotOK || tagsAreNotOK || (scoreHasNotBeenChanged && tagsHaveNotBeenChanged && reviewContentHasNotBeenChanged)}
        >
            {reviewToModify ? "Modify review" : "Add review"}
        </StyledButton>
    );
};

export default SendRequestButton;
