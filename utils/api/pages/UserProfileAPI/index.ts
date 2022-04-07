// Tools
import { prisma } from "@/prisma/db";
import { ageOnly } from "@/utils/api/dateFormat";
import { NotFound } from "@/utils/api/Errors";
// Types
import type { ReviewType } from "@prisma/client";
import type { UserFromQuery, PointsDistributionFromQuery } from "./@types";
import type { User, PointsDistribution } from "@/@types/pages/UserProfile";

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
            },
        });
        if (!data) throw new NotFound(`User with id ${this.userID} could not have been found`);
        data.age = ageOnly(data.birth as Date);
        delete data.birth;

        return data as User;
    }
    /**
     * @Async
     * @Returns
     * ```ts
     * { MIXED: 6, NEGATIVE: 2, POSITIVE: 6, reviewsInTotal: 14 }
     * ```
     */
    public async getPointsDistributions(): Promise<PointsDistribution> {
        const extract = (from: PointsDistributionFromQuery, what: ReviewType): number => {
            const expectedElement = from.find((el) => el.type === what);
            return expectedElement ? expectedElement._count._all : 0;
        };

        const destinationsReviews = (await prisma.destinationReview.groupBy({
            where: { reviewerId: this.userID },
            by: ["type"],
            _count: { _all: true },
        })) as unknown as PointsDistributionFromQuery;
        const landmarksReviews = (await prisma.landmarkReview.groupBy({
            where: { reviewerId: this.userID },
            by: ["type"],
            _count: { _all: true },
        })) as unknown as PointsDistributionFromQuery;

        const negativesInTotal = extract(destinationsReviews, "NEGATIVE") + extract(landmarksReviews, "NEGATIVE");
        const mixedInTotal = extract(destinationsReviews, "MIXED") + extract(landmarksReviews, "MIXED");
        const positivesInTotal = extract(destinationsReviews, "POSITIVE") + extract(landmarksReviews, "POSITIVE");

        return {
            MIXED: mixedInTotal,
            NEGATIVE: negativesInTotal,
            POSITIVE: positivesInTotal,
            reviewsInTotal: positivesInTotal + negativesInTotal + mixedInTotal,
        } as PointsDistribution;
    }
}
