// Tools
import BulkDataCall from "./BulkDataCall";
import PrismaRequestLandmark from "./PrismaRequestBroker/PrismaRequestLandmark";
import PrismaRequestDestination from "./PrismaRequestBroker/PrismaRequestDestination";
// Types
import type { NextApiRequest } from "next";
import type { PrismaRequestBroker, AggregateCallParams, AggregateCallResponse } from "./@types";
import type { ConstructorParams, ReviewsCallResponse, PointsDistribution, ReviewsCallParams } from "@/@types/pages/api/ReviewsAPI";

export default class BulkReviewsAPI {
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
    /**
     * **ASYNC** `processRequest` method allows user to perform a DB query in order to get a fixed amount of reviews's records, with related to them feedback and information about reviewer
     *
     * ### URL queries:
     *
     * All queries are processed by the method itself:
     * - `limit`- limit of reciving records
     * - `perPage`- *pagination property*- amount of records per one page
     * - `page`- *pagination property*- number of current page
     * - `orderBy`- property which will be used to sort records- either `"createdAt"` or `"points"`
     * - `sort`- sorting direction- either `"asc"` or `"desc"`
     * - `certianReviewType`- fetch only specific reviews type- either `"POSITIVE"`, `"NEGATIVE"` or `"MIXED"`
     * - `applyPointsDistribution`- attach additional reviews's summary- the only expected value is `"1"`
     *
     *  **`limit` cannot be used alongside with `page` and `perPage`, because it gets overwritten**
     *
     * ### Usage
     * ```ts
     * await ReviewsAPI.processRequest(request);
     * ```
     * ### Returns
     *
     * By defult method returns array of objects with following pattern:
     * ```ts
     *{
     *    id: "20",
     *    type: "POSITIVE",
     *    points: 7.9,
     *    review: "Est aperiam consequuntur. Quia repellendus dolorem qui. Qui et iure quam sint.",
     *    tags: ["ad", "enim", "et"],
     *    createdAt: "2022-04-06 17:48:12",
     *    reviewer: {
     *        age: 24,
     *        avatar: "lego_star_wars/LSW_ProfileIcons_CloneTrooper_Lt",
     *        country: "United Arab Emirates",
     *        countryCode: "ae",
     *        gender: "MALE",
     *        id: "90",
     *        name: "Samara",
     *        surname: "Kris",
     *    },
     *    feedback: {
     *        dislikes: 23,
     *        likes: 34,
     *    },
     * ```
     * Both `page` ang `perPage` will generate property associated with pagination
     * ```ts
     * {
     *    pagination: {
     *        currentPage: 22,
     *        perPage: 1,
     *        pagesInTotal: 54,
     *        recordsInTotal: 54,
     *    }
     * }
     * ```
     *
     * By adding query `applyPointsDistribution` both following properties are going to be included
     * ```ts
     * {
     *    pointsDistribution: {
     *        MIXED: 22,
     *        NEGATIVE: 11,
     *        POSITIVE: 21,
     *    },
     *    statistics: {
     *        averageScore: 6.29,
     *        recordsInTotal: 54,
     *    },
     * }
     * ```
     */
    public async processComingRequest(request: NextApiRequest): Promise<ReviewsCallResponse> {
        return await new BulkDataCall(request, this.PrismaRequestBroker).main();
    }
    /**
     * **ASYNC** `call` method allows user to perform a DB query in order to get a fixed amount of reviews's records,
     * with related to them feedback and information about reviewer
     *
     * ### NOTE:
     * Call method shares the same logic as `processComingRequest`, the only difference between them is the fact that `call` method
     * can be called without `NextAPIRequest`, because all neccesery queries are passed and compressed into one params object,
     * which is automatically converted into something similar to `NextAPIRequest`
     *
     *
     * ### Params:
     *
     * All following properties are compressed into on params object, which is the only argmunet of the method at the same time:
     * - `limit`- limit of reciving records
     * - `perPage`- *pagination property*- amount of records per one page
     * - `page`- *pagination property*- number of current page
     * - `orderBy`- property which will be used to sort records- either `"createdAt"` or `"points"`
     * - `sort`- sorting direction- either `"asc"` or `"desc"`
     * - `certianReviewType`- fetch only specific reviews type- either `"POSITIVE"`, `"NEGATIVE"` or `"MIXED"`
     * - `applyPointsDistribution`- attach additional reviews's summary- the only expected value is `1`
     *
     *  **`limit` cannot be used alongside with `page` and `perPage`, because it gets overwritten**
     *
     * ### Usage
     * ```ts
     * await ReviewsAPI.call({page: 1, perPage: 20, applyPointsDistribution:1, sort: 'desc'});
     * ```
     * ### Returns
     *
     * By defult method returns array of objects with following pattern:
     * ```ts
     *{
     *    id: "20",
     *    type: "POSITIVE",
     *    points: 7.9,
     *    review: "Est aperiam consequuntur. Quia repellendus dolorem qui. Qui et iure quam sint.",
     *    tags: ["ad", "enim", "et"],
     *    createdAt: "2022-04-06 17:48:12",
     *    reviewer: {
     *        age: 24,
     *        avatar: "lego_star_wars/LSW_ProfileIcons_CloneTrooper_Lt",
     *        country: "United Arab Emirates",
     *        countryCode: "ae",
     *        gender: "MALE",
     *        id: "90",
     *        name: "Samara",
     *        surname: "Kris",
     *    },
     *    feedback: {
     *        dislikes: 23,
     *        likes: 34,
     *    },
     * ```
     * Both `page` ang `perPage` will generate property associated with pagination
     * ```ts
     * {
     *    pagination: {
     *        currentPage: 22,
     *        perPage: 1,
     *        pagesInTotal: 54,
     *        recordsInTotal: 54,
     *    }
     * }
     * ```
     *
     * By adding `applyPointsDistribution` both following properties are going to be included
     * ```ts
     * {
     *    pointsDistribution: {
     *        MIXED: 22,
     *        NEGATIVE: 11,
     *        POSITIVE: 21,
     *    },
     *    statistics: {
     *        averageScore: 6.29,
     *        recordsInTotal: 54,
     *    },
     * }
     * ```
     */
    public async call(params: Partial<ReviewsCallParams>): Promise<ReviewsCallResponse> {
        // Convert received params object into something imitating `NextAPIRequest`, only `query` property is expected,
        // so there is not need to implement the rest of the interface
        const feignedRequest = {
            method: "GET",
            cookies: {},
            query: {
                certianReviewType: params.certianReviewType,
                limit: String(params.limit),
                orderBy: params.orderBy,
                page: String(params.page),
                perPage: String(params.perPage),
                sort: String(params.sort),
                applyPointsDistribution: String(params.applyPointsDistribution),
            } as Partial<Record<keyof ReviewsCallParams, string>>,
        } as NextApiRequest;

        // Erase every empty property
        Object.keys(feignedRequest.query).forEach((key) => {
            if ([undefined, "undefined"].includes(feignedRequest.query[key] as any)) {
                delete feignedRequest.query[key];
            }
        });

        return await new BulkDataCall(feignedRequest, this.PrismaRequestBroker).main();
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
