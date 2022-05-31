// Tools
import LandmarkReviewBroker from "./PrismaReqeustBrokers/LandmarkReviewBroker";
import DestinationReviewBroker from "./PrismaReqeustBrokers/DestinationReviewBroker";
// Types
import type { GuardedAPIResponse } from "@/utils/api/GuardedAPIEndpoint";
import type { PrismaRequestBrokerConstructorParams, PrismaRequestBroker } from "./@types";

interface DeleteReviewAPIConstructorParams {
    idOfReview: string;
    idOfElementAssociatedWithReview: string;
    elementType: "landmark" | "destination";
    authenticationResponse: GuardedAPIResponse;
}

export default class DeleteReviewAPI {
    private PrismaRequestBroker: PrismaRequestBroker;

    public constructor(params: DeleteReviewAPIConstructorParams) {
        const brokerParams: PrismaRequestBrokerConstructorParams = {
            idOfReview: params.idOfReview,
            authenticationResponse: params.authenticationResponse,
            idOfElementAssociatedWithReview: params.idOfElementAssociatedWithReview,
        };

        if (params.elementType === "destination") {
            this.PrismaRequestBroker = new DestinationReviewBroker(brokerParams);
        } else {
            this.PrismaRequestBroker = new LandmarkReviewBroker(brokerParams);
        }
    }

    public async deleteRecord() {
        await this.PrismaRequestBroker.deleteRecord();
    }
}
