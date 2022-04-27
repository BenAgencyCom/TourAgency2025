// Tools
import { prisma } from "@/prisma/db";
import { ageOnly, fullDate } from "@/utils/api/dateFormat";
import { NotFound } from "@/utils/api/Errors";
// Types
import type { ReviewType } from "@prisma/client";
import type { User, PointsDistribution, LatestReview } from "@/@types/pages/UserProfile";
import type { UserFromQuery, AggregateFromQuery, LatestReviewFromQuery } from "./@types";

export default class UserProfileAPI {
    public constructor(public userID: string) {}
    /**
     * @Async
     * @Throwns
     * - `NotFound` when user when user with given ID could not have been found
     * @Returns
     * ```ts
     * {
     *      id: '76',
     *      name: 'Evangeline',
     *      surname: 'Corkery',
     *      avatar: 'lego_star_wars/LSW_ProfileIcons_GamorreanGuard',
     *      country: 'Lithuania',
     *      countryCode: 'lt',
     *      gender: 'MALE',
     *      age: 27
     * }
     * ```
     */
    public async getInfomationAboutUser(): Promise<User> {
        const data: UserFromQuery | null = await prisma.user.findUnique({
            where: { id: this.userID },
            select: {
                id: true,
                name: true,
                surname: true,
                birth: true,
                avatar: true,
                country: true,
                countryCode: true,
                gender: true,
                createdAt: true,
            },
        });
        if (!data) throw new NotFound(`User with id ${this.userID} could not have been found`);
        data.age = ageOnly(data.birth as Date);
        delete data.birth;
        data.memberSince = fullDate(data.createdAt as Date);
        delete data.createdAt;

        return data as User;
    }
    /**
     * @Async
     * @Returns
     * ```ts
     * { MIXED: 6, NEGATIVE: 2, POSITIVE: 6, PREDOMINANT:"POSITIVE", reviewsInTotal: 14, averageScore: 6.3 }
     * ```
     */
    public async getPointsDistributions(): Promise<PointsDistribution> {
        const destinationsReviews = await this._queryForLandmarksReviews();
        const landmarksReviews = await this._queryForDestinationsReviews();

        // If there are no reviews at all
        if (!landmarksReviews.length && !destinationsReviews.length) return this._returnNoPointsDistribution();

        const _countParticularType = (type: ReviewType): number => {
            return this._extract(destinationsReviews, "COUNT", type) + this._extract(landmarksReviews, "COUNT", type);
        };

        const negativesInTotal = _countParticularType("NEGATIVE");
        const mixedInTotal = _countParticularType("MIXED");
        const positivesInTotal = _countParticularType("POSITIVE");

        const reviewsInTotal = positivesInTotal + negativesInTotal + mixedInTotal;

        // In order to avoid dividing by zero
        if (!reviewsInTotal) return this._returnNoPointsDistribution();

        const scoreInTotal = (["NEGATIVE", "MIXED", "POSITIVE"] as ReviewType[])
            .map((type) => {
                return this._extract(destinationsReviews, "SUM", type) + this._extract(landmarksReviews, "SUM", type);
            })
            .reduce((a, b) => a + b);

        const averageScore = Number((scoreInTotal / reviewsInTotal).toFixed(1));
        // PREDOMINANT
        const PREDOMINANT: ReviewType = ((): ReviewType => {
            if (positivesInTotal >= negativesInTotal && positivesInTotal >= mixedInTotal) return "POSITIVE";
            else if (mixedInTotal > positivesInTotal && mixedInTotal >= negativesInTotal) return "MIXED";
            return "NEGATIVE";
        })();

        return {
            MIXED: mixedInTotal,
            NEGATIVE: negativesInTotal,
            POSITIVE: positivesInTotal,
            PREDOMINANT,
            reviewsInTotal,
            averageScore,
        } as PointsDistribution;
    }
    /**
     * **ASYNC**
     */
    public async getLatestReviewScore(): Promise<LatestReview> {
        const latestLandmarkReview: LatestReviewFromQuery = (await prisma.landmarkReview.findFirst({
            orderBy: { createdAt: "desc" },
            where: { reviewerId: this.userID },
            select: { points: true, createdAt: true, type: true },
        })) as LatestReviewFromQuery;
        const latestDestinationReview: LatestReviewFromQuery = (await prisma.destinationReview.findFirst({
            orderBy: { createdAt: "desc" },
            where: { reviewerId: this.userID },
            select: { points: true, createdAt: true, type: true },
        })) as LatestReviewFromQuery;

        const _createResponse = (from: LatestReviewFromQuery): LatestReview => ({
            points: from.points,
            type: from.type,
        });

        if (!latestDestinationReview && !latestLandmarkReview) return { points: 0, type: "NO_SCORE" };
        else if (latestLandmarkReview && !latestDestinationReview) return _createResponse(latestLandmarkReview);
        else if (latestDestinationReview && !latestLandmarkReview) return _createResponse(latestDestinationReview);
        else if (latestLandmarkReview.createdAt > latestDestinationReview.createdAt) return _createResponse(latestLandmarkReview);

        return _createResponse(latestDestinationReview);
    }

    protected async _queryForLandmarksReviews(): Promise<AggregateFromQuery> {
        return (await prisma.landmarkReview.groupBy({
            where: { reviewerId: this.userID },
            by: ["type"],
            _count: { _all: true },
            _sum: { points: true },
        })) as unknown as AggregateFromQuery;
    }

    protected async _queryForDestinationsReviews(): Promise<AggregateFromQuery> {
        return (await prisma.destinationReview.groupBy({
            where: { reviewerId: this.userID },
            by: ["type"],
            _count: { _all: true },
            _sum: { points: true },
        })) as unknown as AggregateFromQuery;
    }

    protected _returnNoPointsDistribution(): PointsDistribution {
        return {
            MIXED: 0,
            NEGATIVE: 0,
            PREDOMINANT: "NO_SCORE",
            POSITIVE: 0,
            averageScore: 0,
            reviewsInTotal: 0,
        };
    }

    protected _extract(from: AggregateFromQuery, what: "SUM" | "COUNT", type: ReviewType): number {
        const expectedElement = from.find((el) => el.type === type);
        if (!expectedElement) return 0;
        return what === "SUM" ? expectedElement._sum.points : expectedElement._count._all;
    }
}
