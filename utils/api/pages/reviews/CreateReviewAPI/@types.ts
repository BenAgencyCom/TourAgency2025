import type { LandmarkReview } from "@prisma/client";

export interface PrismaRequestBrokerConstructorParams {
    userId: string;
    idOfElementAssociatedWithReview: string;
}

export interface PrismaRequestBroker extends PrismaRequestBrokerConstructorParams {
    addRecord: (params: AddRecordMethodParams) => Promise<void>;
    ensureThatThereIsNoDuplicate: () => Promise<void>;
    ensureThatModelExists: () => Promise<void>;
}

export interface AddRecordMethodParams {
    points: LandmarkReview["points"];
    tags: LandmarkReview["tags"];
    reviewContent: LandmarkReview["review"];
}
