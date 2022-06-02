// Types
import type { LandmarkReview } from "@prisma/client";
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";

export interface UpdateRecordMethodParams {
    tags: LandmarkReview["tags"];
    points: LandmarkReview["points"];
    reviewContent: LandmarkReview["review"];
}

export interface PrismaRequestBrokerConstructorParams {
    /** Review id */
    idOfReview: string;
    /** Either **destination** or **landmark** id */
    idOfElementAssociatedWithReview: string;
    authenticationResponse: GuardedAPIResponse;
}

export interface PrismaRequestBroker extends PrismaRequestBrokerConstructorParams {
    updateRecord: (params: UpdateRecordMethodParams) => Promise<ModifiedReviewResponse>;
}

export interface ModifiedReviewResponse {
    type: LandmarkReview["type"];
    points: LandmarkReview["points"];
    review: LandmarkReview["review"];
    tags: LandmarkReview["tags"];
}
