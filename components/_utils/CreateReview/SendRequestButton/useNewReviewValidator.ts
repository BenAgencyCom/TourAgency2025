// Tools
import { useMemo } from "react";
import restrictions from "@/utils/restrictions/createReview";
// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";

interface HookParams {
    tags: string[];
    scoreInt: number;
    scoreFloat: number;
    reviewContent: string;
    isAuthenticated: boolean;
    reviewToModify: Review | null;
}

interface HookResponse {
    actualScore: number;
    buttonIsDisabled: boolean;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (params: HookParams): HookResponse => {
    const { scoreInt, scoreFloat, reviewContent, reviewToModify, tags, isAuthenticated } = params;

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

    const buttonIsDisabled = useMemo<boolean>(() => {
        return !isAuthenticated || reviewContentIsNotOK || tagsAreNotOK || (scoreHasNotBeenChanged && tagsHaveNotBeenChanged && reviewContentHasNotBeenChanged);
    }, [isAuthenticated, reviewContentHasNotBeenChanged, reviewContentIsNotOK, scoreHasNotBeenChanged, tagsAreNotOK, tagsHaveNotBeenChanged]);

    return {
        actualScore,
        buttonIsDisabled,
    };
};
