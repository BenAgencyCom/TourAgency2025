// Tools
import { prisma } from "@/prisma/db";
import { ageOnly } from "@/utils/api/dateFormat";
import { Conflict, NotFound } from "@/utils/api/Errors";
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
        const res = await prisma.landmarkReview.create({
            data: {
                points: params.points,
                review: params.reviewContent,
                tags: params.tags as any,
                type: this.generateReviewType(params.points),
                landmarkId: this.idOfElementAssociatedWithReview,
                reviewerId: this.userId,
            },
            select: {
                id: true,
                review: true,
                points: true,
                tags: true,
                createdAt: true,
                type: true,
                reviewer: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        country: true,
                        countryCode: true,
                        gender: true,
                        avatar: true,
                        birth: true,
                    },
                },
            },
        });
        (res as any).reviewer.age = ageOnly((res as any).reviewer.birth);
        delete (res as any).reviewer.birth;
        return res as any;
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

    public async ensureThatModelExists() {
        const record = await prisma.landmark.findUnique({
            where: {
                id: this.idOfElementAssociatedWithReview,
            },
        });
        if (!record) throw new NotFound();
    }
}
