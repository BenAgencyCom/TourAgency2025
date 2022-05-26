// Tools
import prisma from "../../../db";
// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (data: Review[]) => {
    for (const review of data) {
        const entireFeedback = await prisma.landmarkReviewLike.aggregate({
            where: { reviewId: review.id },
            _count: { _all: true },
        });
        expect(review.feedback.dislikes + review.feedback.likes).toEqual(entireFeedback._count._all);
    }
};
