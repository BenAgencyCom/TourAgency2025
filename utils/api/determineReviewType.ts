import type { ReviewType } from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default (points: number): ReviewType => {
    if (points > 7) return "POSITIVE";
    else if (points > 4) return "MIXED";
    return "NEGATIVE";
};
