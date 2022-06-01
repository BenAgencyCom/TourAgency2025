// Tools
import { InvalidRequestedBody } from "@/utils/api/Errors";
import LandmarkReviewBroker from "./PrismaReqeustBrokers/LandmarkReviewBroker";
import DestinationReviewBroker from "./PrismaReqeustBrokers/DestinationReviewBroker";
// Types
import type { Feedback } from "@prisma/client";
import type { PrismaRequestBrokerConstructorParams, PrismaRequestBroker } from "./@types";

interface FeedbackAPIConstructorParams {
    idOfReview: string;
    authenticatedUserId: string;
    feedbackFromRequest: Feedback;
    elementType: "landmark" | "destination";
}

export default class FeedbackAPI {
    private readonly PrismaRequestBroker: PrismaRequestBroker;

    public constructor(params: FeedbackAPIConstructorParams) {
        const brokerParams: PrismaRequestBrokerConstructorParams = {
            idOfReview: params.idOfReview,
            authenticatedUserId: params.authenticatedUserId,
            feedbackFromRequest: params.feedbackFromRequest,
        };
        if (params.elementType === "destination") this.PrismaRequestBroker = new DestinationReviewBroker(brokerParams);
        else this.PrismaRequestBroker = new LandmarkReviewBroker(brokerParams);
    }

    public async handleRequest() {
        this.validateFeedbackFromRequest();
        await this.PrismaRequestBroker.ensureThatReviewExists();
        const currentFeedback = await this.PrismaRequestBroker.checkWhetherAnyFeedbackExists();

        if (currentFeedback) {
            if (currentFeedback === this.PrismaRequestBroker.feedbackFromRequest) {
                // Simply delete current feedback- either UNLIKE or UNDISLIKE
                await this.PrismaRequestBroker.deleteCurrentFeedback();
            } else {
                // Change feedback from LIKE into DISLIKE or vice versa
                await this.PrismaRequestBroker.changeCurrentFeedback();
            }
        } else {
            // There is no feedback so create one
            await this.PrismaRequestBroker.setNewFeedback();
        }
    }

    /**
     * Eneures that received from request feedback is appropriate and can be safely stored in the database
     */
    private validateFeedbackFromRequest() {
        const receivedFeedbackIsOk = (["DISLIKE", "LIKE"] as Feedback[]).includes(this.PrismaRequestBroker.feedbackFromRequest);
        if (!receivedFeedbackIsOk) throw new InvalidRequestedBody();
    }
}
