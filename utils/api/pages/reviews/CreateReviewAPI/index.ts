// Tools
import ReviewBodyValidator from "../ReviewBodyValidator";
import LandmarkReviewBroker from "./PrismaReqeustBrokers/LandmarkReviewBroker";
import DestinationReviewBroker from "./PrismaReqeustBrokers/DestinationReviewBroker";
// Types
import type { PrismaRequestBroker, AddRecordMethodParams, PrismaRequestBrokerConstructorParams } from "./@types";

interface CreateReviewParams {
    idOfElementToAddReview: string;
    userId: string;
    elementType: "destination" | "landmark";
}

export default class CreateReview {
    private PrismaRequestBroker: PrismaRequestBroker;

    public constructor(params: CreateReviewParams) {
        const brokerParams: PrismaRequestBrokerConstructorParams = {
            idOfElementAssociatedWithReview: params.idOfElementToAddReview,
            userId: params.userId,
        };

        if (params.elementType === "destination") this.PrismaRequestBroker = new DestinationReviewBroker(brokerParams);
        else this.PrismaRequestBroker = new LandmarkReviewBroker(brokerParams);
    }

    public async create(params: AddRecordMethodParams) {
        this.validateRequestBody(params);

        await this.PrismaRequestBroker.ensureThatModelExists();
        await this.PrismaRequestBroker.ensureThatThereIsNoDuplicate();
        await this.PrismaRequestBroker.addRecord(params);
    }

    private validateRequestBody(params: AddRecordMethodParams) {
        new ReviewBodyValidator().validate({
            points: params.points,
            reviewContent: params.reviewContent,
            tags: params.tags as any,
        });
    }
}
