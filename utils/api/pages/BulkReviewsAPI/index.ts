// Tools
import { ValidationError } from "@/utils/api/Errors";
import { fullDate, ageOnly } from "@/utils/api/dateFormat";
import PrismaRequestLandmark from "./PrismaRequestBroker/PrismaRequestLandmark";
import PrismaRequestDestination from "./PrismaRequestBroker/PrismaRequestDestination";
// Types
import type { ReviewFromQuery, FeedbackFromQuery, PrismaRequestBroker, AggregateCallParams, AggregateCallResponse } from "./@types";
import type { ConstructorParams, ReviewsCallParams, Review, ReviewsCallResponse, PointsDistribution } from "@/@types/pages/api/ReviewsAPI";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";

export default class BulkReviewsAPI {
    private _callParams: ReviewsCallParams | null = null;
    private _reviewsFromQuery: ReviewFromQuery[] = [];
    private _feedbackFromQuery: FeedbackFromQuery[] = [];

    private PrismaRequestBroker: PrismaRequestBroker;

    /**
     * `BulkReviewsAPI` provides infrastructure to access either `DestinationReview` or `LandmarkReview` data from DB
     *
     * ### Params
     *
     * Constructor accept one parameter- an object with optional following properties:
     * - `reviewsType`- defines the purpose of the instance, possible values are either `"landmarks"` or `"destinations"`
     * - `reviewingModelId`- ID of certain model, which reviews are going to be used
     *
     * * ### Usage
     * ```ts
     * const ReviewsAPI = new BulkReviewsAPI({ reviewsType: "destinations", reviewingModelId: "WARSZAWA"});
     * ```
     */
    public constructor(params: ConstructorParams) {
        const { reviewsType: type, reviewingModelId: id } = params;

        if (type === "destinations") this.PrismaRequestBroker = new PrismaRequestDestination(type, id);
        else this.PrismaRequestBroker = new PrismaRequestLandmark(type, id);
    }

    private async _establishPaginationProperites(_recordsInTotal: number): Promise<PaginationProperties | false> {
        if (!this._callParams?.page || !this._callParams?.perPage) return false;

        let recordsInTotal: number = _recordsInTotal;

        // The number of records in total varies during fetching specific type reviews only
        const { certianReviewType } = this._callParams;
        if (certianReviewType) recordsInTotal = await this.PrismaRequestBroker.countRecordsWithSpecificTypeOnly(certianReviewType);

        const { page, perPage } = this._callParams;
        const floored = Math.floor(recordsInTotal / perPage);

        return {
            currentPage: page,
            perPage: perPage,
            pagesInTotal: recordsInTotal % perPage ? floored + 1 : floored,
            recordsInTotal,
        };
    }

    private _extractFromFeedback(reviewId: string, feedback: "LIKE" | "DISLIKE"): number {
        const { _feedbackFromQuery: feedbacks } = this;

        const index: number = feedbacks.findIndex((el: FeedbackFromQuery) => el.reviewId === reviewId && el.feedback === feedback);
        if (index && feedbacks[index]) {
            const amount = feedbacks[index]._count._all;
            feedbacks.splice(index, 1);
            return amount;
        }
        return 0;
    }

    private _mergeReviewsAndFeedback(): Review[] {
        return this._reviewsFromQuery.map((review): Review => {
            const { reviewer } = review;

            return {
                createdAt: fullDate(review.createdAt),
                feedback: {
                    dislikes: this._extractFromFeedback(review.id, "DISLIKE"),
                    likes: this._extractFromFeedback(review.id, "LIKE"),
                },
                id: review.id,
                points: review.points,
                review: review.review,
                tags: review.tags as string[],
                type: review.type,
                reviewer: {
                    age: ageOnly(reviewer.birth),
                    avatar: reviewer.avatar,
                    country: reviewer.country,
                    countryCode: reviewer.countryCode,
                    gender: reviewer.gender,
                    id: reviewer.id,
                    name: reviewer.name,
                    surname: reviewer.surname,
                },
            };
        });
    }

    private async _callForFeedback() {
        const reviewsIds: string[] = this._reviewsFromQuery.map((el) => el.id);
        this._feedbackFromQuery = await this.PrismaRequestBroker.callForFeedback(reviewsIds);
    }

    private async _callForReviews() {
        if (!this._callParams) throw new Error("");
        this._reviewsFromQuery = await this.PrismaRequestBroker.callForReviews(this._callParams);
    }

    private _establishCallParams(params: Partial<ReviewsCallParams>) {
        // Ensure that numbers are all positive
        [Number(params.limit), Number(params.page), Number(params.perPage)].forEach((num) => {
            if (num < 0) throw new ValidationError();
        });
        // Ensure that received properties `sort` and `orderBy` both match expecting values
        if (params.orderBy && !["latest", "score"].includes(params.orderBy)) throw new ValidationError();
        if (params.sort && !["asc", "desc"].includes(params.sort)) throw new ValidationError();
        if (params.certianReviewType && !["POSITIVE", "MIXED", "NEGATIVE"].includes(params.certianReviewType)) throw new ValidationError();

        this._callParams = {
            limit: params.limit ?? null,
            perPage: params.perPage ?? null,
            page: params.page ?? null,
            orderBy: params.orderBy ?? "latest",
            sort: params.sort ?? "desc",
            certianReviewType: params.certianReviewType ?? null,
        };
    }
    /**
     * **ASYNC** `call` method allows user to perform a DB query in order to get a fixed amount of reviews's records, with related to them feedback and information about reviewer
     *
     * ### Params
     *
     * Method accept one parameter- an object with optional following properties:
     * - `limit`- limit of reciving records
     * - `perPage`- *pagination property*- amount of records per one page
     * - `page`- *pagination property*- number of current page
     * - `orderBy`- property which will be used to sort records- either `"latest"` or `"score"`
     * - `sort`- sorting direction- either `"asc"` or `"desc"`
     * - `certianReviewType`- fetch only specific reviews type- either `"POSITIVE"`, `"NEGATIVE"` or `"MIXED"`
     *
     * **`limit` cannot be used alongside with `page` and `perPage`, because it gets overwritten**
     *
     * ### Usage
     * ```ts
     * await ReviewsAPI.call({
     *    orderBy: "score",
     *    page: 2,
     *    perPage: 7,
     *    certianReviewType: "NEGATIVE"
     *});
     * ```
     */
    public async call(params: Partial<ReviewsCallParams>): Promise<ReviewsCallResponse> {
        this._establishCallParams(params);

        await this._callForReviews();
        await this._callForFeedback();
        const aggregate = await this.PrismaRequestBroker.aggregateCall({ count: true });

        const reviews: Review[] = this._mergeReviewsAndFeedback();
        const paginationProperties = await this._establishPaginationProperites(aggregate.count as number);

        return {
            reviews: reviews,
            ...(paginationProperties ? { pagination: paginationProperties } : {}),
        };
    }
    /**
     * **ASYNC** `aggregate` method allows user to count all records or to receive computed average value of certain property
     *
     * ### Params
     *
     * Method accept one parameter- an object with optional following properties:
     * - `count`- enables records's counting
     * - `avgScore`- establishes an average score of ALL records
     *
     * ### Usage
     * ```ts
     * await ReviewsAPI.aggregateCall({ count: true, avgScore: true })
     * ```
     *
     * ### Returns
     * ```ts
     * { count?: 58, avgScore?: 6.1 }
     * ```
     */
    public async aggregate(params: AggregateCallParams): Promise<AggregateCallResponse> {
        return this.PrismaRequestBroker.aggregateCall(params);
    }

    /**
     * **ASYNC** `pointsDistribution` simple method to get points distribution of user's reviews.
     *
     * ### Returns
     * ```ts
     * { MIXED: 13, NEGATIVE: 28, POSITIVE: 16 }
     * ```
     */
    public async pointsDistribution(): Promise<PointsDistribution> {
        return this.PrismaRequestBroker.pointsDistribution();
    }
}
