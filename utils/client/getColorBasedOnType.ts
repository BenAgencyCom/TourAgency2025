// Tools
import colorTheme from "@/colorTheme";
// Types
import type { ReviewType } from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default (type: ReviewType | "NO_SCORE"): string => {
    const colors: Record<ReviewType | "NO_SCORE", string> = {
        NO_SCORE: colorTheme.palette.text.primary,
        POSITIVE: colorTheme.palette.success.main,
        MIXED: colorTheme.palette.warning.main,
        NEGATIVE: colorTheme.palette.error.main,
    };

    return colors[type];
};
