// Tools
import faker from "faker";
import { prisma } from "@/tests/API/helpers/db";
import MockReviewAbstract from "./_MockReviewAbstract";
import MockUser from "@/tests/API/helpers/mocks/MockUser";
// Types
import { Prisma } from "@prisma/client";
import type { ReviewMock } from "./@types";
import type { ReviewType } from "@prisma/client";

interface DestinationReviewInfo {
    userId?: string;
    type?: ReviewType;
    destinationId: string;
}

export default class MockDestinationReview extends MockReviewAbstract implements ReviewMock {
    private mockedUsers: MockUser[] = [];

    public id: string | null = null;
    public constructor() {
        super();
    }

    public async prepare(params: DestinationReviewInfo): Promise<MockDestinationReview> {
        const { destinationId, type: _type, userId } = params;
        const type: ReviewType = _type ?? "MIXED";
        const res = await prisma.destinationReview.create({
            data: {
                type: type,
                destinationId,
                reviewerId: userId ?? (await this._mockUser()),
                tags: this.generateTags(),
                review: faker.lorem.sentences(7),
                points: this.generatePoints(type),
            },
        });
        this.id = res.id;
        return this;
    }
    public async remove(): Promise<MockDestinationReview> {
        if (this.id !== null) {
            if (await prisma.destinationReview.findUnique({ where: { id: this.id } })) {
                await prisma.destinationReview.delete({ where: { id: this.id } });
                this.id = null;
            }

            for (const mockedUser of this.mockedUsers) {
                await mockedUser.remove();
            }
        }

        return this;
    }

    public async addFeedback(params: { likes: number; dislikes: number }): Promise<MockDestinationReview> {
        const { id: reviewId } = this;
        if (reviewId === null) return this;
        const data: Prisma.Enumerable<Prisma.DestinationReviewLikeCreateManyInput> = [];
        // Store likes
        for (let i = 0; i < params.likes; i++) {
            data.push({
                feedback: "LIKE",
                reviewId,
                userId: await this._mockUser(),
            });
        }
        // Store dislikes
        for (let i = 0; i < params.dislikes; i++) {
            data.push({
                feedback: "DISLIKE",
                reviewId,
                userId: await this._mockUser(),
            });
        }

        await prisma.destinationReviewLike.createMany({
            data,
        });

        return this;
    }

    /**
     * Handle all stuff related with mocking a user instance and returns new user's id
     */
    private async _mockUser(): Promise<string> {
        const user = new MockUser();
        await user.prepare();
        this.mockedUsers.push(user);

        return user.id as string;
    }
}
