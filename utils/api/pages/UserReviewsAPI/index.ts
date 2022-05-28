// Tools
import { prisma } from "@/prisma/db";
import { NotFound } from "@/utils/api/Errors";
import { selectLandmarkReview, selectDestinationReview } from "./PrismaSelectPart";
import BulkAPIsURLQueriesHandler from "@/utils/api/abstracts/BulkAPIsURLQueriesHandler";
// Types
import type { NextApiRequest } from "next";
import type { ReviewType } from "@prisma/client";
import type { DestinationReview, LandmarkReview } from "@/@types/pages/UserProfile";

interface ExtraProperties {
    type: "landmark" | "destination";
    userId: string;
    certianReviewType: ReviewType | null;
}

export default class UserReviewsAPI extends BulkAPIsURLQueriesHandler<ExtraProperties> {
    protected userWithGivenIDExists: boolean | null = null;

    public constructor(req: NextApiRequest) {
        super(
            req as any,
            ["createdAt", "points"],
            [
                {
                    name: "type",
                    required: true,
                    values: ["landmark", "destination"],
                },
                {
                    name: "id",
                    required: true,
                    alias: "userId",
                    compareWith: "reviewerId",
                },
                {
                    name: "certianReviewType",
                    values: ["MIXED", "POSITIVE", "NEGATIVE"],
                    compareWith: "type",
                },
            ]
        );
        this.converURLQueriesIntoPrismaBody();
    }
    /**
     * **ASYNC**
     *
     * Ensures that user with given ID exists
     *
     * Should be called immediately after creating a new instance, otherwise it
     * will be called automatically during usage of any other class method
     *
     * If user could not have been found throwns `NotFound` Error
     * Returns instance of
     */
    public async ensureThatUserExists() {
        const userFromDB = await prisma.user.findUnique({ where: { id: this.queriesFromRequest.userId } });
        if (!userFromDB) {
            this.userWithGivenIDExists = false;
            throw new NotFound(`User with a given id of ${this.queriesFromRequest.userId} does not exist`);
        }

        this.userWithGivenIDExists = true;
    }
    /**
     * **ASYNC**
     * Get particular user's reviews based on provided URL queries
     *
     * ### URL queries:
     *
     * All queries are processed by the method itself:
     * - `type` - **REQUIRED**- either `"landmark"` or `"destination"`- defines reviewing subject
     * - `id` - **REQUIRED**- *automatically applied by by `NextAPIRequest`*- defines userID
     * - `limit`- limit of reciving records
     * - `perPage`- amount of records per one page
     * - `page`- number of current page
     * - `orderBy`- property which will be used to sort records- either `"createdAt"` or `"points"`
     * - `sort`- sorting direction- either `"asc"` or `"desc"`
     * - `certianReviewType`- fetch only specific reviews type- either `"POSITIVE"`, `"NEGATIVE"` or `"MIXED"`
     *
     *  **`limit` cannot be used alongside with `page` and `perPage`, because it gets overwritten**
     *
     */
    public async getReviews() {
        if (this.userWithGivenIDExists === null) await this.ensureThatUserExists();
        else if (this.userWithGivenIDExists === false) throw new NotFound();

        const reviews = await this._queryForReviews();
        const recordsInTotal = await this._countAllRecords();
        const paginationProperties = this.establishPaginationProperties(recordsInTotal);

        return {
            reviews,
            ...(paginationProperties ? { pagination: paginationProperties } : {}),
        };
    }

    protected async _countAllRecords(): Promise<number> {
        const certainTypeHasBeenReceived = ["POSITIVE", "NEGATIVE", "MIXED"].includes(this.queriesFromRequest.certianReviewType as any);

        if (this.queriesFromRequest.type === "landmark") {
            const recordsInTotal = await prisma.landmarkReview.aggregate({
                where: {
                    reviewerId: this.queriesFromRequest.userId,
                    ...(certainTypeHasBeenReceived && { type: this.queriesFromRequest.certianReviewType as ReviewType }),
                },
                _count: { _all: true },
            });

            return recordsInTotal._count._all;
        }
        const recordsInTotal = await prisma.destinationReview.aggregate({
            where: {
                reviewerId: this.queriesFromRequest.userId,
                ...(certainTypeHasBeenReceived && { type: this.queriesFromRequest.certianReviewType as ReviewType }),
            },
            _count: { _all: true },
        });

        return recordsInTotal._count._all;
    }

    protected async _queryForReviews(): Promise<DestinationReview[] | LandmarkReview[]> {
        switch (this.queriesFromRequest.type) {
            case "destination":
                return (await prisma.destinationReview.findMany({
                    ...selectDestinationReview,
                    ...this.converURLQueriesIntoPrismaBody(),
                })) as unknown as DestinationReview[];
            case "landmark":
                return (await prisma.landmarkReview.findMany({
                    ...selectLandmarkReview,
                    ...this.converURLQueriesIntoPrismaBody(),
                })) as unknown as LandmarkReview[];
            default:
                throw new Error(`Unexpected value of ${this.queriesFromRequest.type} for type property`);
        }
    }
}
