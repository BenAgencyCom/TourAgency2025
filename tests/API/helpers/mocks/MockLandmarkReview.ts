// Tools
import faker from "faker";
import { prisma } from "@/tests/API/helpers/db";
import MockReviewAbstract from "./_MockReviewAbstract";
import MockUser from "@/tests/API/helpers/mocks/MockUser";
// Types
import { Prisma } from "@prisma/client";
import type { ReviewMock } from "./@types";
import type { ReviewType, Feedback } from "@prisma/client";

interface LandmarkReviewInfo {
    userId: string;
    type: ReviewType;
    landmarkId: string;
}

export default class MockLandmarkReview extends MockReviewAbstract implements ReviewMock {
    private mockedUsers: MockUser[] = [];

    public ID: string | null = null;
    public constructor() {
        super();
    }

    public async prepare(params: LandmarkReviewInfo) {
        const { landmarkId, type, userId } = params;
        const res = await prisma.landmarkReview.create({
            data: {
                type,
                landmarkId,
                reviewerId: userId,
                tags: this.generateTags(),
                review: faker.lorem.sentences(7),
                points: this.generatePoints(type),
            },
        });
        this.ID = res.id;
    }
    public async remove() {
        if (this.ID === null) return;
        if (await prisma.landmarkReview.findUnique({ where: { id: this.ID } })) {
            await prisma.landmarkReview.delete({ where: { id: this.ID } });
        }

        for (const mockedUser of this.mockedUsers) {
            await mockedUser.remove();
        }
    }

    public async addFeedback(params: { likes: number; dislikes: number }) {
        const { ID: reviewId } = this;
        if (reviewId === null) return;
        const data: Prisma.Enumerable<Prisma.LandmarkReviewLikeCreateManyInput> = [];
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

        await prisma.landmarkReviewLike.createMany({
            data,
        });
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
