// Tools
import { prisma } from "@/prisma/db";
import { Conflict } from "@/utils/api/Errors";
import PrismaReviewBrokerAbstract from "./PrismaReviewBrokerAbstract";
// Types
import type { PrismaRequestBroker, AddRecordMethodParams, PrismaRequestBrokerConstructorParams } from "../@types";

export default class LandmarkReviewBroker extends PrismaReviewBrokerAbstract implements PrismaRequestBroker {
    public readonly userId: string;
    public readonly idOfElementAssociatedWithReview: string;

    public constructor(params: PrismaRequestBrokerConstructorParams) {
        super();

        this.idOfElementAssociatedWithReview = params.idOfElementAssociatedWithReview;
        this.userId = params.userId;
    }

    public async addRecord(params: AddRecordMethodParams) {
        await prisma.landmarkReview.create({
            data: {
                points: params.points,
                review: params.reviewContent,
                tags: params.tags as any,
                type: this.generateReviewType(params.points),
                landmarkId: this.idOfElementAssociatedWithReview,
                reviewerId: this.userId,
            },
        });
    }

    public async ensureThatThereIsNoDuplicate() {
        const duplicate = await prisma.landmarkReview.findFirst({
            where: {
                reviewerId: this.userId,
                landmarkId: this.idOfElementAssociatedWithReview,
            },
        });
        if (duplicate) throw new Conflict();
    }
}
