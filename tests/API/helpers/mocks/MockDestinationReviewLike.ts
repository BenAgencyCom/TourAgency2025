// Tools
import prisma from "@/tests/API/helpers/db";
// Types
import type { Mock } from "./@types";
import type { Feedback } from "@prisma/client";

interface MockDestinationReviewLikeParams {
    type?: Feedback;
    userId: string;
    reviewId: string;
}

export default class MockDestinationReviewLike implements Mock {
    public id: string | null = null;
    public constructor() {}

    public async prepare(params: MockDestinationReviewLikeParams): Promise<MockDestinationReviewLike> {
        const { id } = await prisma.destinationReviewLike.create({
            data: {
                feedback: params.type ?? "DISLIKE",
                reviewId: params.reviewId,
                userId: params.userId,
            },
        });
        this.id = id;
        return this;
    }

    public async remove(): Promise<MockDestinationReviewLike> {
        if (this.id !== null) {
            if (await prisma.destinationReviewLike.findUnique({ where: { id: this.id as string } })) {
                await prisma.destinationReviewLike.delete({ where: { id: this.id as string } });
                this.id = null;
            }
        }
        return this;
    }
}
