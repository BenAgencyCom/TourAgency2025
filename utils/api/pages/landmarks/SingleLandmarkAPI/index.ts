// Tools
import { prisma } from "@/prisma/db";
import BulkReviewsAPI from "@/utils/api/pages/reviews/BulkReviewsAPI";
import { SelectMainLandmark, SelectAdditionalLandmarks } from "./PrismaSelectPart";
// Types
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { AdditionalLandmark, Landmark, DataFromAPI } from "@/@types/pages/landmarks/SingleLandmark";
import type { MainLandmarkFromQuery, RatingsSummary } from "./@types";

export default class SingleLandmarkAPI {
    protected mainLandmark: MainLandmarkFromQuery = {} as MainLandmarkFromQuery;
    protected ReviewsAPI: BulkReviewsAPI | null = null;

    public constructor(protected slug: string) {}
    public async main(): Promise<DataFromAPI> {
        await this.queryForMainLandmark();
        await this.createReviewsAPIInstance();
        const { totalReviews, ratings } = await this.queryForRatingsSummary();

        return {
            landmark: this.mainLandmark as unknown as Landmark,
            additionalLandmarks: await this.queryForAdditionalLandmarks(),
            averageReview: ratings,
            reviewsInTotal: totalReviews,
            reviews: await this.queryForReviews(),
        };
    }

    //
    protected async queryForMainLandmark() {
        const result = await prisma.landmark.findUnique({
            where: { slug: this.slug },
            ...(SelectMainLandmark as any),
        });
        if (!result) throw new Error();
        this.mainLandmark = result as unknown as MainLandmarkFromQuery;
    }

    //
    protected async createReviewsAPIInstance() {
        this.ReviewsAPI = new BulkReviewsAPI({
            reviewsType: "landmarks",
            reviewingModelId: this.mainLandmark.id,
        });
    }

    //
    protected async queryForRatingsSummary(): Promise<RatingsSummary> {
        const ratings = await this.ReviewsAPI?.aggregate({ avgScore: true, count: true });
        return {
            ratings: ratings?.avgScore ?? 0,
            totalReviews: ratings?.count ?? 0,
        };
    }

    //
    protected async queryForReviews(): Promise<Review[]> {
        if (!this.ReviewsAPI) throw new Error();
        return (await this.ReviewsAPI.call({ limit: 3, orderBy: "createdAt", sort: "desc" })).reviews;
    }

    //
    protected async queryForAdditionalLandmarks(): Promise<AdditionalLandmark[]> {
        // Try to find 3 landmarks in the same city as the main landmark
        const landmarksInTheSameCity = (await prisma.landmark.findMany({
            where: {
                destination: {
                    city: this.mainLandmark.destination.city,
                },
                NOT: {
                    id: this.mainLandmark.id,
                },
            },
            take: 3,
            ...(SelectAdditionalLandmarks as any),
        })) as unknown[] as AdditionalLandmark[];
        const amountOfLandmarksInTheSameCity = landmarksInTheSameCity.length;
        if (amountOfLandmarksInTheSameCity === 3) return landmarksInTheSameCity;
        // If there are less than 3 landmarks in main landmarks's city, then look for remaining landmarks in the same country
        const landmarksInTheSameCountry = (await prisma.landmark.findMany({
            where: {
                destination: {
                    city: this.mainLandmark.destination.city,
                },
                NOT: {
                    id: {
                        in: [this.mainLandmark.id, ...landmarksInTheSameCity.map((el) => el.id)],
                    },
                },
            },
            take: 3 - amountOfLandmarksInTheSameCity,
            ...(SelectAdditionalLandmarks as any),
        })) as unknown[] as AdditionalLandmark[];
        const amountOfLandmarksInTheSameCountry = landmarksInTheSameCountry.length;
        if (amountOfLandmarksInTheSameCity + amountOfLandmarksInTheSameCountry === 3) return [...landmarksInTheSameCity, ...landmarksInTheSameCountry];
        // Otherwise take any other landmarks
        const anyOtherLandmarks = (await prisma.landmark.findMany({
            where: {
                destination: {
                    city: this.mainLandmark.destination.city,
                },
                NOT: {
                    id: {
                        in: [this.mainLandmark.id, ...landmarksInTheSameCity.map((el) => el.id), ...landmarksInTheSameCountry.map((el) => el.id)],
                    },
                },
            },
            take: 3 - amountOfLandmarksInTheSameCity - amountOfLandmarksInTheSameCountry,
            ...(SelectAdditionalLandmarks as any),
        })) as unknown[] as AdditionalLandmark[];

        return [...landmarksInTheSameCity, ...landmarksInTheSameCountry, ...anyOtherLandmarks];
    }
}
