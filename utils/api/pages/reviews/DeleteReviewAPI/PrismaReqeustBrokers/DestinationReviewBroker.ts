// Tools
import { prisma } from "@/prisma/db";
import CircumstancesValidator from "../../_abstracts/CircumstancesValidator";
// Types
import type { PrismaRequestBrokerConstructorParams, PrismaRequestBroker } from "../@types";

export default class DestinationReviewBroker extends CircumstancesValidator implements PrismaRequestBroker {
    public constructor(params: PrismaRequestBrokerConstructorParams) {
        super({
            modelType: "destination",
            idOfReview: params.idOfReview,
            authenticationResponse: params.authenticationResponse,
            idOfElementAssociatedWithReview: params.idOfElementAssociatedWithReview,
            allowAdminsToDoThis: true,
        });
    }

    public async deleteRecord(): Promise<void> {
        await this.ensureThatRecordExistsAndUserIsEntitledToDoIndendedAction();
        await prisma.destinationReview.deleteMany({
            where: {
                id: this.idOfReview,
                destinationId: this.idOfElementAssociatedWithReview,
            },
        });
    }
}
