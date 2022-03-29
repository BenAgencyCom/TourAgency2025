import type { ReviewType } from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default (points: number): ReviewType => {
    if (points > 7.5) return "POSITIVE";
    else if (points > 4.5) return "MIXED";
    return "NEGATIVE";
};
