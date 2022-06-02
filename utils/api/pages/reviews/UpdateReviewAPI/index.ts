// Tools
import ReviewBodyValidator from "../ReviewBodyValidator";
import LandmarkReviewBroker from "./PrismaReqeustBrokers/LandmarkReviewBroker";
import DestinationReviewBroker from "./PrismaReqeustBrokers/DestinationReviewBroker";
// Types
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";
import type { UpdateRecordMethodParams, PrismaRequestBroker, PrismaRequestBrokerConstructorParams, ModifiedReviewResponse } from "./@types";

interface UpdateReviewAPIConstructorParams {
    idOfReview: string;
    idOfElementAssociatedWithReview: string;
    elementType: "landmark" | "destination";
    authenticationResponse: GuardedAPIResponse;
}

export default class UpdateReviewAPI {
    private readonly PrismaRequestBroker: PrismaRequestBroker;

    public constructor(params: UpdateReviewAPIConstructorParams) {
        const brokerParams: PrismaRequestBrokerConstructorParams = {
            authenticationResponse: params.authenticationResponse,
            idOfElementAssociatedWithReview: params.idOfElementAssociatedWithReview,
            idOfReview: params.idOfReview,
        };
        if (params.elementType === "destination") this.PrismaRequestBroker = new DestinationReviewBroker(brokerParams);
        else this.PrismaRequestBroker = new LandmarkReviewBroker(brokerParams);
    }

    public async updateRecord(params: UpdateRecordMethodParams): Promise<ModifiedReviewResponse> {
        this.validateRequestBody(params);
        return await this.PrismaRequestBroker.updateRecord(params);
    }

    private validateRequestBody(params: UpdateRecordMethodParams) {
        new ReviewBodyValidator().validate({
            points: params.points,
            reviewContent: params.reviewContent,
            tags: params.tags as any,
        });
    }
}
