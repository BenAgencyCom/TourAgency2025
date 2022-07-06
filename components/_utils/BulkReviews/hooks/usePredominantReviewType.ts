// Tools
import { useMemo } from "react";
import useBulkReviewsContext from "./useBulkReviewsContext";
// Types
import type { ReviewType } from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default (): ReviewType | "_loading" | "NO_SCORE" => {
    const context = useBulkReviewsContext();
    const { value } = context.fetchingResult.pointsDistribution;

    const type = useMemo<ReviewType | "_loading" | "NO_SCORE">(() => {
        if (!value) return "_loading";
        const { MIXED, NEGATIVE, POSITIVE } = value;

        if (MIXED + NEGATIVE + POSITIVE === 0) return "NO_SCORE";
        else if (POSITIVE >= NEGATIVE && POSITIVE >= MIXED) return "POSITIVE";
        else if (MIXED > POSITIVE && MIXED >= NEGATIVE) return "MIXED";
        return "NEGATIVE";
    }, [value]);

    return type;
};
