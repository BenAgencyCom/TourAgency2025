// Tools
import { fullDate, ageOnly } from "@/utils/api/dateFormat";
import PrismaRequestDestination from "./PrismaRequestBroker/PrismaRequestDestination";
import PrismaRequestLandmark from "./PrismaRequestBroker/PrismaRequestLandmark";
// Types
import type { ConstructorParams, ReviewsCallParams, Review, PaginationProperties, ReviewsCallResponse } from "@/@types/pages/api/ReviewsAPI";
import type { ReviewFromQuery, FeedbackFromQuery, PrismaRequestBroker, AggregateCallParams, AggregateCallResponse } from "./@types";

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

    private _establishPaginationProperites(recordsInTotal: number): PaginationProperties | false {
        if (!this._callParams?.page || !this._callParams?.perPage) return false;
        const { page, perPage } = this._callParams;
        const floored = Math.floor(recordsInTotal / perPage);

        return {
            currentPage: page,
            perPage: perPage,
            pagesInTotal: recordsInTotal % perPage ? floored + 1 : floored,
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
        this._callParams = {
            limit: params.limit ?? null,
            perPage: params.perPage ?? null,
            page: params.page || null,
            orderBy: params.orderBy ?? "latest",
            sort: params.sort ?? "desc",
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
     *
     * **`limit` cannot be used alongside with `page` and `perPage`, because it gets overwritten**
     *
     * ### Usage
     * ```ts
     * await ReviewsAPI.call({
     *    orderBy: "score",
     *    page: 2,
     *    perPage: 7,
     *});
     * ```
     */
    public async call(params: Partial<ReviewsCallParams>): Promise<ReviewsCallResponse> {
        this._establishCallParams(params);

        await this._callForReviews();
        await this._callForFeedback();
        const aggregate = await this.PrismaRequestBroker.aggregateCall({ count: true, avgScore: true });

        const reviews: Review[] = this._mergeReviewsAndFeedback();
        const paginationProperties = this._establishPaginationProperites(aggregate.count as number);

        return {
            data: reviews,
            avgScore: aggregate.avgScore as number,
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
     * * ### Usage
     * ```ts
     * await ReviewsAPI.aggregateCall({ count: true, avgScore: true })
     * ```
     */
    public async aggregate(params: AggregateCallParams): Promise<AggregateCallResponse> {
        return this.PrismaRequestBroker.aggregateCall(params);
    }
}
