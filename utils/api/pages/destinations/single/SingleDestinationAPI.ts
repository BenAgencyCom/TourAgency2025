// Tools
import moment from "moment";
import { prisma } from "@/prisma/db";
// Types
import type { DestinationContentField } from "@/@types/DestinationDescription";
import type { Destination, DestinationFromQuery, FeedbackFromQuery, Review } from "@/@types/pages/destinations/SingleDestination";

interface RatingsSummary {
    ratings: number;
    totalReviews: number;
}
interface DataFromAPI extends RatingsSummary {
    destination: Destination;
}

export default class SingleDestinationAPI {
    private feedbacks: FeedbackFromQuery[] = [];
    private destinationFromQuery: DestinationFromQuery = {} as DestinationFromQuery;
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
                    select: {
                        slug: true,
                        title: true,
                        picture: true,
                        type: true,
                    },
                },
                reviews: {
                    take: 7,
                    orderBy: {
                        createdAt: "desc",
                    },
                    select: {
                        id: true,
                        review: true,
                        points: true,
                        createdAt: true,
                        tags: true,
                        reviewer: {
                            select: {
                                id: true,
                                name: true,
                                surname: true,
                                country: true,
                                countryCode: true,
                                gender: true,
                                avatar: true,
                                birth: true,
                            },
                        },
                    },
                },
            },
        });
        if (!destination) throw new Error();
        return destination;
    }

    private async queryForFeedback(): Promise<FeedbackFromQuery[]> {
        const reviewsIds: string[] = this.destinationFromQuery.reviews.map((el) => el.id);

        return (await prisma.destinationReviewLike.groupBy({
            by: ["reviewId", "feedback"],
            where: { reviewId: { in: reviewsIds } },
            _count: { _all: true },
        })) as unknown as FeedbackFromQuery[];
    }

    private async queryForRatingsSummary(): Promise<RatingsSummary> {
        const ratings = await prisma.destinationReview.aggregate({
            where: {
                destinationId: this.destinationFromQuery.id,
            },
            _avg: {
                points: true,
            },
            _count: {
                _all: true,
            },
        });
        return {
            ratings: ratings._avg.points ?? 0,
            totalReviews: ratings._count._all ?? 0,
        };
    }

    private reformatReviews(): Review[] {
        const { feedbacks, destinationFromQuery } = this;

        const extractFromFeedback = (reviewId: string, feedback: "LIKE" | "DISLIKE"): number => {
            const index: number = feedbacks.findIndex((el: FeedbackFromQuery) => el.reviewId === reviewId && el.feedback === feedback);
            if (index && feedbacks[index]) {
                const amount = feedbacks[index]._count._all;
                feedbacks.splice(index, 1);
                return amount;
            }
            return 0;
        };

        return destinationFromQuery.reviews.map((review): Review => {
            const { reviewer } = review;

            return {
                createdAt: moment(review.createdAt).format("YYYY-MM-DD HH:mm:ss") as string,
                feedback: {
                    dislikes: extractFromFeedback(review.id, "DISLIKE"),
                    likes: extractFromFeedback(review.id, "LIKE"),
                },
                id: review.id,
                points: review.points,
                review: review.review,
                tags: review.tags as string[],
                reviewer: {
                    age: ((reviewer as any).birth = moment().diff((review.reviewer as any).birth, "years")),
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

    public async main(): Promise<DataFromAPI> {
        this.destinationFromQuery = await this.queryForDestination();
        this.feedbacks = await this.queryForFeedback();
        const { totalReviews, ratings } = await this.queryForRatingsSummary();
        const reviews = this.reformatReviews();

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
                reviews,
            },
            totalReviews,
            ratings,
        };
    }
}
