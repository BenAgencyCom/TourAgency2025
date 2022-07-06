// Types
import type { ReviewType } from "@prisma/client";

export default abstract class PrismaReviewBrokerAbstract {
    protected generateReviewType(points: number): ReviewType {
        if (points > 7) return "POSITIVE";
        else if (points > 4) return "MIXED";
        return "NEGATIVE";
    }
}
