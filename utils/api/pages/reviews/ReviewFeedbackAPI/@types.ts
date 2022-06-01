// Types
import type { NextApiRequest } from "next";
import type { Feedback } from "@prisma/client";

export interface PrismaRequestBrokerConstructorParams {
    /** Review id */
    idOfReview: string;
    authenticatedUserId: string;
    feedbackFromRequest: Feedback;
}

export interface PrismaRequestBroker extends PrismaRequestBrokerConstructorParams {
    /**
     * Check whether authenticated user had either liked or disliked
     *
     * Returns:
     * - `LIKE` | `DISLIKE`- when user had actually either liked or disliked the review
     * - `null`- otherwise
     */
    checkWhetherAnyFeedbackExists(): Promise<Feedback | null>;
    /**
     * Sets new feedback
     */
    setNewFeedback(): Promise<void>;
    /**
     * Modify currently existing feedback
     */
    changeCurrentFeedback(): Promise<void>;
    /**
     * Delete currently existing feedback
     */
    deleteCurrentFeedback(): Promise<void>;
    /**
     * Ensure that review exists at all\
     *
     * Throwns:
     * -`NotFound`- when no review has been founded
     */
    ensureThatReviewExists(): Promise<void>;
}
