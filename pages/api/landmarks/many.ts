// Tools
import { prisma } from "@/prisma/db";
// Types
import type {} from "@prisma/client";
import type { Response, Request, Landmark, SortBy } from "@/@types/pages/ManyLandmarks";
//
//
//
interface LandmarkFromQuery extends Omit<Landmark, "reviews"> {
    id: string;
}
interface ReviewFromQuery {
    landmarkId: string;
    _count: { _all: number };
    _avg: { points: number };
}

export default async function handler(req: Request, res: Response) {
    if (req.method !== "GET") return res.status(404).end();

    try {
        class GetManyLandmarks {
            private result: Landmark[] = [];
            public constructor(private query: Request["query"]) {}

            private generateWhereClause() {
                if (!this.query.certianContinent) return {};
                else return { destination: { continent: this.query.certianContinent } };
            }

            private async queryForLandmarks(): Promise<LandmarkFromQuery[]> {
                return await prisma.landmark.findMany({
                    where: this.generateWhereClause() as any,
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        picture: true,
                        tags: true,
                        type: true,
                        destination: {
                            select: {
                                slug: true,
                                city: true,
                                country: true,
                                countryCode: true,
                                continent: true,
                                population: true,
                                folder: true,
                            },
                        },
                    },
                });
            }

            private async queryForReviews(listOfIds: string[]): Promise<ReviewFromQuery[]> {
                return (await prisma.landmarkReview.groupBy({
                    by: ["landmarkId"],
                    where: {
                        landmarkId: {
                            in: listOfIds,
                        },
                    },
                    _count: {
                        _all: true,
                    },
                    _avg: {
                        points: true,
                    },
                })) as any;
            }

            private combineLandmarksAndReviewsFromQueriesTogether(landmarks: LandmarkFromQuery[], reviews: ReviewFromQuery[]): Landmark[] {
                return landmarks.map((landmark): Landmark => {
                    const indexOfMatchingReview = reviews.findIndex((review) => review.landmarkId === landmark.id);
                    const matchingReview: ReviewFromQuery = reviews.splice(indexOfMatchingReview, 1)[0];
                    return {
                        tags: landmark.tags,
                        slug: landmark.slug,
                        type: landmark.type,
                        title: landmark.title,
                        picture: landmark.picture,
                        destination: landmark.destination,
                        reviews: {
                            average: Number(matchingReview._avg.points.toFixed(2)),
                            inTotal: matchingReview._count._all,
                        },
                    };
                });
            }

            private handleSortAndOrder() {
                if (!this.query.sortBy || !["reviews", "population"].includes(this.query.sortBy)) return {};

                type Callbacks = Record<SortBy, (a: Landmark, b: Landmark) => number>;
                const callbacks: Callbacks = {
                    reviews: (a, b) => a.reviews.average - b.reviews.average,
                    population: (a, b) => a.destination.population - b.destination.population,
                };
                const callback = callbacks[this.query.sortBy];
                this.result = this.result.sort(callback);

                if (this.query.orderBy === "DESC") this.result = this.result.reverse();
            }

            private applyPaggination(): Landmark[][] {
                const perPage = req.query.perPage ?? 3;
                const paginated: Landmark[][] = [[]];
                let latestArrayLength = 0;
                let indexOfLastArray = 0;

                this.result.forEach((el, index) => {
                    if (latestArrayLength == perPage) {
                        paginated.push([]);
                        latestArrayLength = 0;
                        indexOfLastArray += 1;
                    }
                    paginated[indexOfLastArray].push(el);
                    latestArrayLength += 1;
                });

                return paginated;
            }

            public async main(): Promise<Response["data"]> {
                const landmarks = await this.queryForLandmarks();
                const reviews = await this.queryForReviews(landmarks.map((el) => el.id));

                this.result = this.combineLandmarksAndReviewsFromQueriesTogether(landmarks, reviews);
                this.handleSortAndOrder();

                const pages = this.applyPaggination();

                return {
                    numberOfPages: pages.length,
                    pages,
                };
            }
        }
        const result = await new GetManyLandmarks(req.query).main();

        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).end();
    }
}
