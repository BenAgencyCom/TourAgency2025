// Tools
import colorTheme from "@/colorTheme";
// Types
import type { ReviewType } from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default (type: ReviewType): string => {
    const colors: Record<ReviewType, string> = {
        POSITIVE: colorTheme.palette.success.main,
        MIXED: colorTheme.palette.warning.main,
        NEGATIVE: colorTheme.palette.error.main,
    };

    return colors[type];
};
