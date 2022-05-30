// Tools
import joi from "joi";
import { InvalidRequestedBody } from "@/utils/api/Errors";
import restrictions from "@/utils/restrictions/createReview";
import LandmarkReviewBroker from "./PrismaRequstBrokers/LandmarkReviewBroker";
import DestinationReviewBroker from "./PrismaRequstBrokers/DestinationReviewBroker";

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
        const scheme = joi.object({
            points: joi.number().min(0).max(10).required(),
            reviewContent: joi.string().min(restrictions.content.min).max(restrictions.content.max).required(),
            tags: joi.array().min(restrictions.tagsInGeneral.min).max(restrictions.tagsInGeneral.max).items(joi.string().min(restrictions.singleTag.min).max(restrictions.singleTag.max)).required(),
        });
        const { error } = scheme.validate(params);
        if (error) throw new InvalidRequestedBody();
    }
}
