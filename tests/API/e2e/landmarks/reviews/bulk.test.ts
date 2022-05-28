// Tools
import prisma from "@/tests/API/helpers/db";
import testPagination from "@/tests/API/helpers/testPagination";
import { testGETRequestStatus } from "@/tests/API/helpers/testStatus";
import makeRequest from "@/tests/API/helpers/landmarks/reviews/bulk/makeRequest";
import expectAllRecordsAreTheSameType from "@/tests/API/helpers/landmarks/reviews/bulk/expectAllRecordsAreTheSameType";
import expectAllRecordsToHaveProperlyAsignedFeedback from "@/tests/API/helpers/landmarks/reviews/bulk/expectAllRecordsToHaveProperlyAsignedFeedback";
// Mocks
import MockUser from "@/tests/API/helpers/mocks/MockUser";
import MockLandmark from "@/tests/API/helpers/mocks/MockLandmark";
import MockDestination from "@/tests/API/helpers/mocks/MockDestination";
import MockLandmarkReview from "@/tests/API/helpers/mocks/MockLandmarkReview";
// Types
import type { ReviewType } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";

const ALL_TYPES = ["MIXED", "NEGATIVE", "POSITIVE"] as ReviewType[];

describe("GET: api/landmark/[slug]/reviews", () => {
    const LANDMARK_ID = "1";

    describe("Pinned review", () => {
        const review = new MockLandmarkReview();
        const user = new MockUser();

        beforeAll(async () => {
            await user.prepare();
            await review.prepare({
                landmarkId: LANDMARK_ID,
                type: "POSITIVE",
                userId: user.id as string,
            });
            await review.addFeedback({ dislikes: 2, likes: 10 });
        });

        afterAll(async () => {
            await review.remove();
            await user.remove();
        });

        test("Review can be pinned", async () => {
            const res = await makeRequest(LANDMARK_ID)({
                pinnedRequestId: review.ID as string,
                perPage: 1,
            });
            expect(res.pinnedReview).not.toBeFalsy();
            expect(res.pinnedReview?.id).toEqual(review.ID as string);
        });
        test("Feedback has been assigned properly", async () => {
            const res = await makeRequest(LANDMARK_ID)({
                pinnedRequestId: review.ID as string,
                perPage: 1,
            });
            await expectAllRecordsToHaveProperlyAsignedFeedback([res.pinnedReview as Review]);
        });
        test("Pinned review does not repeat throughout the rest of the data", async () => {
            const res = await makeRequest(LANDMARK_ID)({
                pinnedRequestId: review.ID as string,
            });
            const allReviewsIDs: string[] = res.reviews.map((el) => el.id);
            expect(allReviewsIDs).not.toContain(review.ID as string);
        });
    });

    describe("404", () => {
        test("When landmark does not exist", async () => {
            await testGETRequestStatus(`/api/landmark/UNEXISTING/reviews`, 404);
        });
        test("When landmark is not APPROVED", async () => {
            const destination = new MockDestination();
            const landmark = new MockLandmark();
            await destination.prepare();
            await landmark.prepare(destination.id);
            await testGETRequestStatus(`/api/landmark/${landmark.id}/reviews`, 404);

            await destination.remove();
        });
    });

    describe("Sorting", () => {
        test("Best score", async () => {
            const { reviews } = await makeRequest(LANDMARK_ID)({
                sort: "desc",
                orderBy: "points",
            });
            let latestScore: null | number = null;
            for (const { points } of reviews) {
                if (latestScore !== null) {
                    expect(points).toBeLessThanOrEqual(latestScore);
                }
                latestScore = points;
            }
        });
        test("Worst score", async () => {
            const { reviews } = await makeRequest(LANDMARK_ID)({
                sort: "asc",
                orderBy: "points",
            });
            let latestScore: null | number = null;
            for (const { points } of reviews) {
                if (latestScore !== null) {
                    expect(points).toBeGreaterThanOrEqual(latestScore);
                }
                latestScore = points;
            }
        });
    });
    describe("Fetch data based on their type", () => {
        for (const type of ALL_TYPES) {
            describe(type, () => {
                test("Authenticated user will always see their review", async () => {
                    const AMOUNT_OF_LIKES = 10;
                    const AMOUNT_OF_DISLIKES = 3;

                    const user = new MockUser();
                    const destination = new MockDestination();
                    const landmark = new MockLandmark({ status: "APPROVED" });
                    const review = new MockLandmarkReview();
                    //
                    await user.prepare();
                    await destination.prepare();
                    await landmark.prepare(destination.id);
                    await review.prepare({
                        landmarkId: landmark.id,
                        userId: user.id as string,
                        type: "POSITIVE",
                    });
                    await review.addFeedback({ likes: AMOUNT_OF_LIKES, dislikes: AMOUNT_OF_DISLIKES });
                    //
                    expect(user.accessTokenAsCookie).not.toBeFalsy();
                    const response = await makeRequest(landmark.id)(
                        {
                            certianReviewType: type,
                        },
                        user.accessTokenAsCookie as string
                    );
                    expect(response.authenticatedUserReview).not.toBeFalsy();
                    const authenticatedUserReview = response.authenticatedUserReview as Review;

                    (["id", "review", "tags", "points", "feedback", "reviewer"] as (keyof Review)[]).forEach((prop) => {
                        expect(authenticatedUserReview).toHaveProperty(prop);
                    });
                    expect(authenticatedUserReview.type).toEqual("POSITIVE");
                    expect(authenticatedUserReview.feedback.likes).toEqual(AMOUNT_OF_LIKES);
                    expect(authenticatedUserReview.feedback.dislikes).toEqual(AMOUNT_OF_DISLIKES);

                    await review.remove(); // Remove all mocked users
                    await user.remove();
                    await destination.remove(); // Landmark will be deleted due to CASCADE relation
                });

                test("All reviews are the same type", async () => {
                    const { reviews } = await makeRequest(LANDMARK_ID)({
                        certianReviewType: type,
                    });
                    expectAllRecordsAreTheSameType(reviews, type);
                });
                testPagination({
                    uniquePropertyName: "id",
                    recordsPerPage: [2, 4, 8, 12, 16],
                    getAllAvailableData: async () =>
                        await prisma.landmarkReview.findMany({
                            where: { landmarkId: LANDMARK_ID, type }, //
                            select: { id: true },
                        }),
                    loadPage: async (page: number, perPage: number) => {
                        const { reviews, pagination } = await makeRequest(LANDMARK_ID)({
                            certianReviewType: type,
                            page,
                            perPage,
                        });
                        return { data: reviews, pagination: pagination as any };
                    },
                    additionalTests: [
                        {
                            name: "Feedback should be properly assigned",
                            cb: async (data: Review[]) => {
                                await expectAllRecordsToHaveProperlyAsignedFeedback(data);
                            },
                        },
                    ],
                });
            });
        }
    });
});
