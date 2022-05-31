import type { LandmarkReview } from "@prisma/client";
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";

export interface PrismaRequestBrokerConstructorParams {
    /** Review id */
    idOfReview: string;
    /** Either **destination** or **landmark** id */
    idOfElementAssociatedWithReview: string;
    authenticationResponse: GuardedAPIResponse;
}

export interface PrismaRequestBroker extends PrismaRequestBrokerConstructorParams {
    deleteRecord: () => Promise<void>;
    /**
     * Firstable finds reviews with given reviewer id and model
     * id and subsequently decides whether the user is allowed to delete
     * this review (either review creator or any administrator)
     *
     * Throwns:
     * - `Forbidden`- when user is not allowed to delete a review
     * - `NotFound`- when method does not exist
     *
     * *Called automaticly by `deleteRecord` method*
     */
    ensurePermissionToDelete: (params: GuardedAPIResponse) => Promise<void>;
}

export interface AddRecordMethodParams {
    points: LandmarkReview["points"];
    tags: LandmarkReview["tags"];
    reviewContent: LandmarkReview["review"];
}
