// Tools
import prisma from "@/tests/API/helpers/db";
// Types
import type { Mock } from "./@types";
import type { Feedback } from "@prisma/client";

interface MockLandmarkReviewLikeParams {
    type?: Feedback;
    userId: string;
    reviewId: string;
}

export default class MockLandmarkReviewLike implements Mock {
    public id: string | null = null;
    public constructor() {}

    public async prepare(params: MockLandmarkReviewLikeParams): Promise<MockLandmarkReviewLike> {
        const { id } = await prisma.landmarkReviewLike.create({
            data: {
                feedback: params.type ?? "DISLIKE",
                reviewId: params.reviewId,
                userId: params.userId,
            },
        });
        this.id = id;
        return this;
    }

    public async remove(): Promise<MockLandmarkReviewLike> {
        if (this.id !== null) {
            if (await prisma.landmarkReviewLike.findUnique({ where: { id: this.id as string } })) {
                await prisma.landmarkReviewLike.delete({ where: { id: this.id as string } });
                this.id = null;
            }
        }
        return this;
    }
}
