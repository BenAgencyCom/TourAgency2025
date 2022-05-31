// Tools
import { prisma } from "@/prisma/db";
import { NotFound, Forbidden } from "@/utils/api/Errors";
// Types
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";
import type { PrismaRequestBrokerConstructorParams, PrismaRequestBroker } from "../@types";

export default class LandmarkReviewBroker implements PrismaRequestBroker {
    public readonly idOfElementAssociatedWithReview: string;
    public readonly idOfReview: string;
    public readonly authenticationResponse: GuardedAPIResponse;

    public constructor(params: PrismaRequestBrokerConstructorParams) {
        this.idOfReview = params.idOfReview;
        this.authenticationResponse = params.authenticationResponse;
        this.idOfElementAssociatedWithReview = params.idOfElementAssociatedWithReview;
    }

    public async deleteRecord(): Promise<void> {
        await this.ensurePermissionToDelete();
        await prisma.landmarkReview.deleteMany({
            where: {
                id: this.idOfReview,
                landmarkId: this.idOfElementAssociatedWithReview,
            },
        });
    }

    public async ensurePermissionToDelete(): Promise<void> {
        const model = await prisma.landmarkReview.findFirst({
            where: {
                id: this.idOfReview,
                landmarkId: this.idOfElementAssociatedWithReview,
            },
            select: {
                reviewer: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (!model) throw new NotFound();

        const authenticatedUserIsNotAnAuthorOfTheReview = model.reviewer.id !== this.authenticationResponse.authenticatedUserId;
        const authenticatedUserIsNotAnAdmin = !this.authenticationResponse.isAdmin;

        if (authenticatedUserIsNotAnAdmin && authenticatedUserIsNotAnAuthorOfTheReview) throw new Forbidden();
    }
}
