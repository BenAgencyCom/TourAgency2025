// Tools
import prisma from "@/tests/API/helpers/db";
import { testRequestStatus } from "@/tests/API/helpers/testStatus";
import makeRequest from "@/tests/API/helpers/landmarks/reviews/bulk/makeRequest";
// Mocks
import MockUser from "@/tests/API/helpers/mocks/MockUser";
import MockLandmark from "@/tests/API/helpers/mocks/MockLandmark";
import MockDestination from "@/tests/API/helpers/mocks/MockDestination";
import MockLandmarkReview from "@/tests/API/helpers/mocks/MockLandmarkReview";
import MockLandmarkReviewLike from "@/tests/API/helpers/mocks/MockLandmarkReviewLike";
// Types
import type { ReviewType, Feedback } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";

describe("All routes:", () => {
    describe("POST: /api/landmark/[landmark_id]/reviews/[review_id]/feedback", () => {
        const user = new MockUser();
        const destination = new MockDestination();
        const landmark = new MockLandmark({ status: "APPROVED" });
        const review = new MockLandmarkReview();

        const getReviewFeedback = async (): Promise<{ likes: number; dislikes: number }> => {
            const juxtaposition = await prisma.landmarkReviewLike.groupBy({
                by: ["feedback"],
                where: { reviewId: review.id as string },
                _count: {
                    feedback: true,
                },
            });
            return {
                dislikes: juxtaposition.find((el) => el.feedback == "DISLIKE")?._count.feedback as number,
                likes: juxtaposition.find((el) => el.feedback == "LIKE")?._count.feedback as number,
            };
        };

        beforeAll(async () => {
            await user.prepare();
            await destination.prepare();
            await landmark.prepare(destination.id as string);
            await review
                .prepare({
                    landmarkId: landmark.id as string,
                    userId: user.id as string,
                })
                .then((review) =>
                    review.addFeedback({
                        dislikes: 3,
                        likes: 6,
                    })
                );
        });
        afterAll(async () => {
            await review.remove();
            await destination.remove();
            await user.remove();
        });
        beforeEach(async () => {
            await prisma.landmarkReviewLike.deleteMany({
                where: {
                    reviewId: review.id as string,
                    userId: user.id as string,
                },
            });
        });
        describe("LIKE", () => {
            test("Unauthenticated user cannot LIKE a landmark review", async () => {
                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${review.id as string}/feedback`,
                    expectedStatus: 403,
                    body: { feedback: "LIKE" as Feedback },
                });
                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes);
            });
            test("User can LIKE their own landmark review", async () => {
                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${review.id as string}/feedback`,
                    expectedStatus: 200,
                    body: { feedback: "LIKE" as Feedback },
                    Cookie: user.accessTokenAsCookie as string,
                });
                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes + 1);
            });
            test("User can LIKE someone other's landmark review", async () => {
                const otherUser = await new MockUser().prepare();

                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${review.id as string}/feedback`,
                    expectedStatus: 200,
                    body: { feedback: "LIKE" as Feedback },
                    Cookie: otherUser.accessTokenAsCookie as string,
                });

                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes + 1);
            });
            test("User can UNLIKE a landmark review", async () => {
                // There is no need to store this mock, becouse it will be removed by CASCADE relation eather way
                await new MockLandmarkReviewLike().prepare({
                    reviewId: review.id as string,
                    userId: user.id as string,
                    type: "LIKE",
                });
                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${review.id as string}/feedback`,
                    expectedStatus: 200,
                    body: { feedback: "LIKE" as Feedback },
                    Cookie: user.accessTokenAsCookie as string,
                });
                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes - 1);
            });
            test("User can change feedback from LIKE into DISLIKE", async () => {
                // There is no need to store this mock, becouse it will be removed by CASCADE relation eather way
                await new MockLandmarkReviewLike().prepare({
                    reviewId: review.id as string,
                    userId: user.id as string,
                    type: "LIKE",
                });
                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${review.id as string}/feedback`,
                    expectedStatus: 200,
                    body: { feedback: "DISLIKE" as Feedback },
                    Cookie: user.accessTokenAsCookie as string,
                });
                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes + 1);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes - 1);
            });
            test("404 while trying to LIKE unexisting review", async () => {
                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/UNEXISTING_LANDMARK_REVIEW/feedback`,
                    expectedStatus: 404,
                    body: { feedback: "LIKE" as Feedback },
                    Cookie: user.accessTokenAsCookie as string,
                });
                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes);
            });
        });

        describe("DISLIKE", () => {
            test("Unauthenticated user cannot DISLIKE a landmark review", async () => {
                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${review.id as string}/feedback`,
                    expectedStatus: 403,
                    body: { feedback: "DISLIKE" as Feedback },
                });
                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes);
            });
            test("User can DISLIKE their own landmark review", async () => {
                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${review.id as string}/feedback`,
                    expectedStatus: 200,
                    body: { feedback: "DISLIKE" as Feedback },
                    Cookie: user.accessTokenAsCookie as string,
                });
                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes + 1);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes);
            });
            test("User can DISLIKE someone other's landmark review", async () => {
                const otherUser = await new MockUser().prepare();

                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${review.id as string}/feedback`,
                    expectedStatus: 200,
                    body: { feedback: "DISLIKE" as Feedback },
                    Cookie: otherUser.accessTokenAsCookie as string,
                });

                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes + 1);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes);
            });
            test("User can UNDISLIKE a landmark review", async () => {
                // There is no need to store this mock, becouse it will be removed by CASCADE relation eather way
                await new MockLandmarkReviewLike().prepare({
                    reviewId: review.id as string,
                    userId: user.id as string,
                    type: "DISLIKE",
                });
                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${review.id as string}/feedback`,
                    expectedStatus: 200,
                    body: { feedback: "DISLIKE" as Feedback },
                    Cookie: user.accessTokenAsCookie as string,
                });
                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes - 1);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes);
            });
            test("User can change feedback from DISLIKE into LIKE", async () => {
                // There is no need to store this mock, becouse it will be removed by CASCADE relation eather way
                await new MockLandmarkReviewLike().prepare({
                    reviewId: review.id as string,
                    userId: user.id as string,
                    type: "DISLIKE",
                });
                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${review.id as string}/feedback`,
                    expectedStatus: 200,
                    body: { feedback: "LIKE" as Feedback },
                    Cookie: user.accessTokenAsCookie as string,
                });
                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes - 1);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes + 1);
            });
            test("404 while trying to DISLIKE unexisting review", async () => {
                const feedbackAtTheBegininning = await getReviewFeedback();
                await testRequestStatus({
                    method: "POST",
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/UNEXISTING_LANDMARK_REVIEW/feedback`,
                    expectedStatus: 404,
                    body: { feedback: "LIKE" as Feedback },
                    Cookie: user.accessTokenAsCookie as string,
                });
                const feedbackAtTheEnd = await getReviewFeedback();
                expect(feedbackAtTheEnd.dislikes).toEqual(feedbackAtTheBegininning.dislikes);
                expect(feedbackAtTheEnd.likes).toEqual(feedbackAtTheBegininning.likes);
            });
        });
    });

    describe("GET: /api/landmark/[landmark_id]/reviews", () => {
        const user = new MockUser();
        const destination = new MockDestination();
        const landmark = new MockLandmark();

        beforeAll(async () => {
            await user.prepare();
            await destination.prepare();
            await landmark.prepare(destination.id as string);
        });

        afterAll(async () => {
            await user.remove();
            await destination.remove();
        });

        test("Include authenticated user likes associated with bulk reviews on current page", async () => {
            const MockedReviews: MockLandmarkReview[] = [];
            const MockedUsers: MockUser[] = [];
            //
            // Mock some reviews and immediately like/dislike them by the user
            //
            for (let i = 0; i < 5; i++) {
                const newMockedReview = await new MockLandmarkReview().prepare({ landmarkId: landmark.id as string });
                await new MockLandmarkReviewLike().prepare({
                    reviewId: newMockedReview.id as string, //
                    userId: user.id as string,
                    type: i % 2 ? "DISLIKE" : "LIKE", // diversify a bit
                });

                MockedReviews.push(newMockedReview);
            }
            //
            // On the other hand reviews without a like/dislike from the user
            //
            for (let i = 0; i < 5; i++) {
                const newMockedReview = await new MockLandmarkReview().prepare({ landmarkId: landmark.id as string });
                const newMockedUser = await new MockUser().prepare();

                await new MockLandmarkReviewLike().prepare({
                    reviewId: newMockedReview.id as string, //
                    userId: newMockedUser.id as string,
                    type: i % 2 ? "DISLIKE" : "LIKE", // diversify a bit
                });

                MockedReviews.push(newMockedReview);
                MockedUsers.push(newMockedUser);
            }
            //
            // Fetch reviews from API
            //
            const { reviews } = await makeRequest(landmark.id as string)({}, user.accessTokenAsCookie as string);
            for (const review of reviews) {
                if (review.feedback.authenticatedUserChoice) {
                    // Compare received distinguished feedback and compare it with its conterpart from the database
                    const likeFromDatabase = await prisma.landmarkReviewLike.findFirst({
                        where: {
                            reviewId: review.id,
                            userId: user.id as string,
                        },
                        select: { feedback: true },
                    });
                    expect(likeFromDatabase?.feedback).toEqual(review.feedback.authenticatedUserChoice);
                }
            }
            //
            // Remove all mocked models
            //
            for (const MockedReview of MockedReviews) await MockedReview.remove();
            for (const MockedUser of MockedUsers) await MockedUser.remove();
        });
        describe("PINNED REVIEW", () => {
            const review = new MockLandmarkReview();
            const feedback = new MockLandmarkReviewLike();
            const otherUser = new MockUser();

            beforeAll(async () => {
                await otherUser.prepare();
                await review.prepare({
                    landmarkId: landmark.id as string,
                    userId: otherUser.id as string,
                });
            });

            beforeEach(async () => {
                await feedback.remove();
            });

            for (const option of ["DISLIKE", "LIKE"] as Feedback[]) {
                test(`Include pinned review ${option}`, async () => {
                    await feedback.prepare({
                        reviewId: review.id as string,
                        userId: user.id as string,
                        type: option,
                    });
                    const res = await makeRequest(landmark.id as string)(
                        {
                            pinnedReviewId: review.id as string,
                        },
                        user.accessTokenAsCookie as string
                    );
                    expect(res.pinnedReview?.feedback.authenticatedUserChoice).toEqual(option);
                });
            }
        });
        describe("AUTHENTICATED USER REVIEW", () => {
            const review = new MockLandmarkReview();
            const feedback = new MockLandmarkReviewLike();

            beforeAll(async () => {
                await review.prepare({
                    landmarkId: landmark.id as string,
                    userId: user.id as string,
                });
            });

            beforeEach(async () => {
                await feedback.remove();
            });

            for (const option of ["LIKE", "DISLIKE"] as Feedback[]) {
                test(`Include authenticated user ${option}`, async () => {
                    await feedback.prepare({
                        reviewId: review.id as string,
                        userId: user.id as string,
                        type: option,
                    });
                    const res = await makeRequest(landmark.id as string)({}, user.accessTokenAsCookie as string);
                    expect(res.authenticatedUserReview?.feedback.authenticatedUserChoice).toEqual(option);
                });
            }
        });
    });
});
