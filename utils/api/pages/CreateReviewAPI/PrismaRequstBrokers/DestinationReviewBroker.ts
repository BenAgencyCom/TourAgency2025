// Tools
import { prisma } from "@/prisma/db";
import { Conflict } from "@/utils/api/Errors";
import PrismaReviewBrokerAbstract from "./PrismaReviewBrokerAbstract";
// Types
import type { PrismaRequestBroker, AddRecordMethodParams, PrismaRequestBrokerConstructorParams } from "../@types";

export default class DestinationReviewBroker extends PrismaReviewBrokerAbstract implements PrismaRequestBroker {
    public readonly userId: string;
    public readonly idOfElementAssociatedWithReview: string;

    public constructor(params: PrismaRequestBrokerConstructorParams) {
        super();

        this.idOfElementAssociatedWithReview = params.idOfElementAssociatedWithReview;
        this.userId = params.userId;
    }

    public async addRecord(params: AddRecordMethodParams) {
        await prisma.destinationReview.create({
            data: {
                points: params.points,
                review: params.reviewContent,
                tags: params.tags as any,
                type: this.generateReviewType(params.points),
                destinationId: this.idOfElementAssociatedWithReview,
                reviewerId: this.userId,
            },
        });
    }

    public async ensureThatThereIsNoDuplicate() {
        const duplicate = await prisma.destinationReview.findFirst({
            where: {
                reviewerId: this.userId,
                destinationId: this.idOfElementAssociatedWithReview,
            },
        });
        if (duplicate) throw new Conflict();
    }
}
