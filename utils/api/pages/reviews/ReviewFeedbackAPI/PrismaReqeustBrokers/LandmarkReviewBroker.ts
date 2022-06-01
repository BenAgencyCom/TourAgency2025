// Tools
import { prisma } from "@/prisma/db";
import { NotFound } from "@/utils/api/Errors";
// Types
import type { Feedback } from "@prisma/client";
import type { PrismaRequestBrokerConstructorParams, PrismaRequestBroker } from "../@types";

export default class LandmarkReview implements PrismaRequestBroker {
    public readonly idOfReview: string;
    public readonly authenticatedUserId: string;
    public readonly feedbackFromRequest: Feedback;

    public constructor(params: PrismaRequestBrokerConstructorParams) {
        this.idOfReview = params.idOfReview;
        this.authenticatedUserId = params.authenticatedUserId;
        this.feedbackFromRequest = params.feedbackFromRequest;
    }

    public async ensureThatReviewExists(): Promise<void> {
        const review = await prisma.landmarkReview.findUnique({ where: { id: this.idOfReview } });
        if (!review) throw new NotFound();
    }

    public async changeCurrentFeedback(): Promise<void> {
        await prisma.landmarkReviewLike.updateMany({
            where: {
                reviewId: this.idOfReview,
                userId: this.authenticatedUserId,
            },
            data: {
                feedback: this.feedbackFromRequest,
            },
        });
    }

    public async deleteCurrentFeedback(): Promise<void> {
        await prisma.landmarkReviewLike.deleteMany({
            where: {
                reviewId: this.idOfReview,
                userId: this.authenticatedUserId,
            },
        });
    }

    public async setNewFeedback(): Promise<void> {
        await prisma.landmarkReviewLike.create({
            data: {
                reviewId: this.idOfReview,
                userId: this.authenticatedUserId,
                feedback: this.feedbackFromRequest,
            },
        });
    }

    public async checkWhetherAnyFeedbackExists(): Promise<Feedback | null> {
        const res = await prisma.landmarkReviewLike.findFirst({
            where: {
                reviewId: this.idOfReview,
                userId: this.authenticatedUserId,
            },
            select: {
                feedback: true,
            },
        });
        return res ? res.feedback : null;
    }
}
