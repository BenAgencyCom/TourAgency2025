// Tools
import prisma from "./db";
// Types
import type { ReviewType } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";

export const expectAllRecordsToHaveProperlyAsignedFeedback = async (data: Review[], type: "destinations" | "landmarks") => {
    if (type === "destinations") {
        for (const review of data) {
            const entireFeedback = await prisma.destinationReviewLike.aggregate({
                where: { reviewId: review.id },
                _count: { _all: true },
            });
            expect(review.feedback.dislikes + review.feedback.likes).toEqual(entireFeedback._count._all);
        }
    } else if (type === "landmarks") {
        for (const review of data) {
            const entireFeedback = await prisma.landmarkReviewLike.aggregate({
                where: { reviewId: review.id },
                _count: { _all: true },
            });
            expect(review.feedback.dislikes + review.feedback.likes).toEqual(entireFeedback._count._all);
        }
    }
};

export const expectAllRecordsAreTheSameType = (data: Review[], type: ReviewType) => {
    data.forEach((el) => {
        expect(el.type).toEqual(type);
    });
};
