import type { LandmarkReview } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";

export interface PrismaRequestBrokerConstructorParams {
    userId: string;
    idOfElementAssociatedWithReview: string;
}

export interface PrismaRequestBroker extends PrismaRequestBrokerConstructorParams {
    addRecord: (params: AddRecordMethodParams) => Promise<Omit<Review, "feedback">>;
    ensureThatThereIsNoDuplicate: () => Promise<void>;
    ensureThatModelExists: () => Promise<void>;
}

export interface AddRecordMethodParams {
    points: LandmarkReview["points"];
    tags: LandmarkReview["tags"];
    reviewContent: LandmarkReview["review"];
}
