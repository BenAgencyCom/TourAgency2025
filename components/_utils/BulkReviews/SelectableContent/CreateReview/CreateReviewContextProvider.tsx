// Tools
import stated from "@/utils/client/stated";
import { useMemo, useState, useEffect } from "react";
import { CreateReviewContext } from "./createReviewContext";
import getColorBasedOnType from "@/utils/client/getColorBasedOnType";
import useBulkReviewsContext from "@/components/_utils/BulkReviews/hooks/useBulkReviewsContext";
// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";

const CreateReviewContextProvider: FunctionComponent = (props) => {
    const bulkReviewsContext = useBulkReviewsContext();

    const [scoreInt, setScoreInt] = useState<number>(0);
    const [scoreFloat, setScoreFloat] = useState<number>(0);
    const [reviewContent, setReviewContent] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    const estimatedReviewType = useMemo<ReviewType>(() => {
        if (scoreInt >= 7) return "POSITIVE";
        else if (scoreInt >= 4) return "MIXED";
        return "NEGATIVE";
    }, [scoreInt]);

    const estimatedReviewColor = useMemo<string>(() => {
        return getColorBasedOnType(estimatedReviewType);
    }, [estimatedReviewType]);

    // Update above create review properties when authenticated user review is loaded
    useEffect(() => {
        const authenticatedUserReview = bulkReviewsContext.fetchingResult.authenticatedUserReview.value;

        if (authenticatedUserReview) {
            const { points, review, tags } = authenticatedUserReview;
            const splitedScore = String(points).split(".");

            setTags(tags);
            setReviewContent(review);
            setScoreInt(Number(splitedScore[0]));
            setScoreFloat(Number(splitedScore[1] ?? 0));
        }
    }, [bulkReviewsContext.fetchingResult.authenticatedUserReview.value]);

    return (
        <CreateReviewContext.Provider
            value={{
                estimatedReviewColor,
                estimatedReviewType,

                tags: stated(tags, setTags),
                scoreInt: stated(scoreInt, setScoreInt),
                scoreFloat: stated(scoreFloat, setScoreFloat),
                reviewContent: stated(reviewContent, setReviewContent),
            }}
        >
            {props.children}
        </CreateReviewContext.Provider>
    );
};

export default CreateReviewContextProvider;
