// Types
import type { ReviewType } from "@prisma/client";
import type { AuthenticatedUserReviewResult } from "./AuthenticatedUserReview";
import type { DestinationReview, User, Feedback as _Feedback } from "@prisma/client";
import type { BulkReviewsType, PointsDistribution } from "@/@types/pages/api/ReviewsAPI";
import type { URLQueriesConvertedIntoPrismaBody } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";

export interface PrismaRequestBroker {
    type: BulkReviewsType;
    id: string;
    /**
     * Ensures that landmark exists at all and also has status fixed to `APPROVED`
     * Throwns
     * - `NotFound` when any of above scenerios occures.
     */
    ensureThatRecordIsApproved(): Promise<void>;
    /**
     * Accpets one parameter- object containning url queries and returns collection of reviews
     */
    callForReviews(convertedURLsQueries: URLQueriesConvertedIntoPrismaBody): Promise<ReviewFromQuery[]>;
    /**
     * Accpets one parameter- array of review ids and returns data matching **SQL GROUP BY convention**
     */
    callForFeedback(idsList: string[]): Promise<FeedbackFromQuery[]>;
    /**
     * Either count records or compute their average score or do both at the same time
     */
    aggregateCall(params: AggregateCallParams): Promise<AggregateCallResponse>;
    /**
     * Create a juxtaposition of all reviews based on their type **POSITIVE**, **NEGATIVE**, **MIXED**
     */
    pointsDistribution(): Promise<PointsDistribution>;
    /**
     * Count all reviews with specific type
     */
    countRecordsWithSpecificTypeOnly(type: ReviewType): Promise<number>;
    /**
     * Accpets one parameter- an id of authenticated user and returns reflecting with it review if it exists,
     * otherwise return null
     */
    getAuthenticatedUserReview(userId: string): Promise<ReviewFromQuery | null>;
    /**
     * The only parameter review's id
     */
    getSpecifiedReview(reviewId: string): Promise<ReviewFromQuery | null>;
    /**
     * Distinguish whether currently authenticated user had liked/disliked one of reviews from feedback
     */
    getAuthenticatedUserFeedback(params: { reviewsIDsList: string[]; userId: string }): Promise<AuthenticatedUserFeedbackFromQuery[]>;
}

export interface ReviewFromQuery {
    id: DestinationReview["id"];
    review: DestinationReview["review"];
    points: DestinationReview["points"];
    tags: DestinationReview["tags"];
    createdAt: DestinationReview["createdAt"];
    type: DestinationReview["type"];
    reviewer: {
        id: User["id"];
        name: User["name"];
        surname: User["surname"];
        country: User["country"];
        countryCode: User["countryCode"];
        gender: User["gender"];
        avatar: User["avatar"];
        birth: User["birth"];
    };
}

export interface AuthenticatedUserFeedbackFromQuery {
    reviewId: string;
    feedback: _Feedback;
}
export interface FeedbackFromQuery {
    reviewId: string;
    feedback: _Feedback;
    _count: {
        _all: number;
    };
}

export interface AggregateCallParams {
    avgScore?: true;
    count?: true;
}
export interface AggregateCallResponse {
    avgScore?: number;
    count?: number;
}

export interface ExtraProperties {
    certianReviewType: ReviewType | null;
    applyPointsDistribution: "1" | false;
    pinnedReviewId?: string;
}

export interface CallForReviewsParams {
    authenticatedUserReview: AuthenticatedUserReviewResult;
    authenticatedUserId: string | null;
}
