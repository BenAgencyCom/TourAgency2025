// Tools
import prisma from "@/tests/API/helpers/db";
import { testGETRequestStatus } from "@/tests/API/helpers/testStatus";
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
    describe("GET: /api/landmark/[landmark_id]/reviews", () => {
        test("Include authenticated user likes associated with bulk reviews on current page", async () => {
            const user = await new MockUser().prepare();
            const destination = await new MockDestination().prepare();
            const landmark = await new MockLandmark({ status: "APPROVED" }).prepare(destination.id as string);
            //
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
            await user.remove();
            await destination.remove();
        });
    });
    describe("POST: /api/landmark/[landmark_id]/reviews/[review_id]/like", () => {});
    describe("DELETE: /api/landmark/[landmark_id]/reviews/[review_id]/like", () => {});
});
