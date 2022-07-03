// Tools
import { prisma } from "@/prisma/db";
import { NotFound, Forbidden } from "@/utils/api/Errors";
// Types
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";

interface CircumstancesValidatorParams {
    idOfReview: string;
    modelType: "landmark" | "destination";
    idOfElementAssociatedWithReview: string;
    authenticationResponse: GuardedAPIResponse;

    allowAdminsToDoThis?: boolean;
}

export default abstract class CircumstancesValidator {
    public readonly idOfReview: string;
    public readonly idOfElementAssociatedWithReview: string;
    public readonly authenticationResponse: GuardedAPIResponse;

    private readonly modelType: CircumstancesValidatorParams["modelType"];
    private readonly allowAdminsToDoThis: boolean;

    public constructor(params: CircumstancesValidatorParams) {
        this.modelType = params.modelType;
        this.idOfReview = params.idOfReview;
        this.authenticationResponse = params.authenticationResponse;
        this.idOfElementAssociatedWithReview = params.idOfElementAssociatedWithReview;
        this.allowAdminsToDoThis = params.allowAdminsToDoThis ?? false;
    }
    /**
     * Ensures that the record with given id actually exists in the database and moreover the
     * user sending request possess the rights to perform indended operation
     *
     * Throwns:
     * - `NotFound`- when the record with given id does not exist
     * - `Forbidden`- when user is not entitled to do what he is willing to do
     */
    public async ensureThatRecordExistsAndUserIsEntitledToDoIndendedAction() {
        if (this.modelType === "landmark") await this.validateLandmarkReview();
        else await this.validateDestinationReview();
    }

    private async validateLandmarkReview() {
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
        this.authorize(model.reviewer.id);
    }

    private async validateDestinationReview() {
        const model = await prisma.destinationReview.findFirst({
            where: {
                id: this.idOfReview,
                destinationId: this.idOfElementAssociatedWithReview,
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
        this.authorize(model.reviewer.id);
    }
    /**
     * Authorize authenticated user, throws `Forbbiden` when the user turns out to be not allowed to perform indended action
     */
    private authorize(idOfReviewerFromDatabase: string) {
        const authenticatedUserIsNotAnAuthorOfTheReview = idOfReviewerFromDatabase !== this.authenticationResponse.authenticatedUserId;
        const authenticatedUserIsNotAnAdmin = !this.authenticationResponse.isAdmin;

        if (this.allowAdminsToDoThis) {
            if (authenticatedUserIsNotAnAdmin && authenticatedUserIsNotAnAuthorOfTheReview) throw new Forbidden();
        } else {
            if (authenticatedUserIsNotAnAuthorOfTheReview) throw new Forbidden();
        }
    }
}
