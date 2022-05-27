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
    private ID: string | null = null;
    private mockedUsers: MockUser[] = [];
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
        await prisma.landmarkReview.delete({ where: { id: this.ID } });

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
                userId: await this._mockUser("LIKE", i),
            });
        }
        // Store dislikes
        for (let i = 0; i < params.dislikes; i++) {
            data.push({
                feedback: "DISLIKE",
                reviewId,
                userId: await this._mockUser("DISLIKE", i),
            });
        }

        await prisma.landmarkReviewLike.createMany({
            data,
        });
    }

    /**
     * Handle all stuff related with mocking a user instance and returns new user's id
     */
    private async _mockUser(feedback: Feedback, i: number): Promise<string> {
        const userId = `unexisting_user_who_${feedback}_${i}`;
        const user = new MockUser({
            id: userId,
            email: `${userId}@gmail.com`,
        });
        await user.prepare();
        this.mockedUsers.push(user);

        return userId;
    }
}
