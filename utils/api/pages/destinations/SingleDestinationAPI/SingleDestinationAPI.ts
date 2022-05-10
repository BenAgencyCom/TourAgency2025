// Tools
import BulkReviewsAPI from "@/utils/api/pages/BulkReviewsAPI";
import { prisma } from "@/prisma/db";
// Types
import type { DestinationContentField } from "@/@types/Description";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { DestinationFromQuery, RatingsSummary, DataFromAPI } from "./@types";

export default class SingleDestinationAPI {
    private destinationFromQuery: DestinationFromQuery = {} as DestinationFromQuery;
    private ReviewsAPI: BulkReviewsAPI | null = null;

    public constructor(private slug: string) {}

    private async queryForDestination(): Promise<DestinationFromQuery> {
        const destination = await prisma.destination.findUnique({
            where: {
                slug: this.slug,
            },
            select: {
                id: true,
                slug: true,
                city: true,
                population: true,
                continent: true,
                shortDescription: true,
                description: true,
                country: true,
                folder: true,
                landmarks: {
                    take: 3,
                    orderBy: {
                        createdAt: "desc",
                    },
                    select: {
                        slug: true,
                        title: true,
                        folder: true,
                        type: true,
                        shortDescription: true,
                        destination: {
                            select: {
                                city: true,
                                country: true,
                            },
                        },
                    },
                },
            },
        });
        if (!destination) throw new Error();
        return destination;
    }
    private createBulkReviewsApiInstance(id: string) {
        this.ReviewsAPI = new BulkReviewsAPI({ reviewingModelId: id, reviewsType: "destinations" });
    }

    private async queryForRatingsSummary(): Promise<RatingsSummary> {
        const ratings = await this.ReviewsAPI?.aggregate({ avgScore: true, count: true });
        return {
            ratings: ratings?.avgScore ?? 0,
            totalReviews: ratings?.count ?? 0,
        };
    }

    private async queryForReviews(): Promise<Review[]> {
        if (!this.ReviewsAPI) throw new Error();
        return (await this.ReviewsAPI.call({ limit: 7 })).reviews;
    }

    public async main(): Promise<DataFromAPI> {
        this.destinationFromQuery = await this.queryForDestination();
        this.createBulkReviewsApiInstance(this.destinationFromQuery.id);

        const { totalReviews, ratings } = await this.queryForRatingsSummary();

        const { destinationFromQuery: destination } = this;

        return {
            destination: {
                city: destination.city,
                continent: destination.continent,
                country: destination.country,
                description: destination.description as DestinationContentField[],
                folder: destination.folder,
                landmarks: destination.landmarks,
                population: destination.population,
                shortDescription: destination.shortDescription,
                slug: destination.slug,
                reviews: await this.queryForReviews(),
            },
            totalReviews,
            ratings,
        };
    }
}
