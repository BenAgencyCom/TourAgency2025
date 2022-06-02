// Tools
import { prisma } from "@/prisma/db";
import CircumstancesValidator from "../../_abstracts/CircumstancesValidator";
// Types
import type { ReviewType } from "@prisma/client";
import type { PrismaRequestBrokerConstructorParams, PrismaRequestBroker, UpdateRecordMethodParams, ModifiedReviewResponse } from "../@types";

export default class LandmarkReviewBroker extends CircumstancesValidator implements PrismaRequestBroker {
    public constructor(params: PrismaRequestBrokerConstructorParams) {
        super({
            modelType: "landmark",
            idOfReview: params.idOfReview,
            authenticationResponse: params.authenticationResponse,
            idOfElementAssociatedWithReview: params.idOfElementAssociatedWithReview,
        });
    }

    public async updateRecord(params: UpdateRecordMethodParams): Promise<ModifiedReviewResponse> {
        await this.ensureThatRecordExistsAndUserIsEntitledToDoIndendedAction();

        return await prisma.landmarkReview.update({
            where: {
                id: this.idOfReview,
            },
            data: {
                points: params.points,
                tags: params.tags as any,
                review: params.reviewContent,
                type: this.generateReviewType(params.points),
            },
            select: {
                points: true,
                review: true,
                tags: true,
                type: true,
            },
        });
    }

    protected generateReviewType(points: number): ReviewType {
        if (points > 7) return "POSITIVE";
        else if (points > 4) return "MIXED";
        return "NEGATIVE";
    }
}
