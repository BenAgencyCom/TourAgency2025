// Tools
import prisma from "@/tests/API/helpers/db";
import { testRequestStatus } from "@/tests/API/helpers/testStatus";
import { VERY_LONG_STRING } from "@/tests/API/data/landmarks/create/index";
import expectReviewInDatabaseToBeUpdated from "@/tests/API/helpers/landmarks/reviews/update/expectReviewInDatabaseToBeUpdated";
import expectReviewInDatabaseToBeNOTUpdated from "@/tests/API/helpers/landmarks/reviews/update/expectReviewInDatabaseToBeNOTUpdated";
// Mocks
import MockUser from "@/tests/API/helpers/mocks/MockUser";
import MockLandmark from "@/tests/API/helpers/mocks/MockLandmark";
import MockDestination from "@/tests/API/helpers/mocks/MockDestination";
import MockLandmarkReview from "@/tests/API/helpers/mocks/MockLandmarkReview";
// Types
import type { CreateReviewRequest } from "@/pages/api/landmark/[landmark_id]/reviews/@types";

const createRequestBody = (): Partial<CreateReviewRequest["body"]> =>
    JSON.parse(
        JSON.stringify({
            points: 1.23,
            reviewContent: "Updated review content",
            tags: ["updated", "tags"],
        } as CreateReviewRequest["body"])
    );

describe("PATCH: /api/landmark/[landmark_id]/reviews/[review_id]", () => {
    const author = new MockUser();
    const destination = new MockDestination();
    const landmark = new MockLandmark();
    const landmarkReview = new MockLandmarkReview();

    beforeAll(async () => {
        await author.prepare();
        await destination.prepare();
        await landmark.prepare(destination.id as string);
    });

    beforeEach(async () => {
        await landmarkReview.remove();
        await landmarkReview.prepare({
            landmarkId: landmark.id as string,
            userId: author.id as string,
            type: "POSITIVE",
        });
    });

    afterAll(async () => {
        await author.remove();
        await destination.remove();
    });

    test("Author of the review can edit it", async () => {
        const body = createRequestBody();

        await testRequestStatus({
            method: "PATCH",
            body,
            endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
            Cookie: author.accessTokenAsCookie as string,
            expectedStatus: 200,
        });

        await expectReviewInDatabaseToBeUpdated({
            body: body as any,
            where: {
                landmarkId: landmark.id as string,
                reviewerId: author.id as string,
            },
        });
    });

    test("Admin CANNOT edit reviews of other users", async () => {
        const admin = new MockUser();
        await admin.prepare({ isAdmin: true });
        const body = createRequestBody();

        await testRequestStatus({
            method: "PATCH",
            body,
            endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
            Cookie: admin.accessTokenAsCookie as string,
            expectedStatus: 403,
        });

        await expectReviewInDatabaseToBeNOTUpdated({
            body: body as any,
            where: {
                landmarkId: landmark.id as string,
                reviewerId: author.id as string,
            },
        });

        await admin.remove();
    });

    test("404 when trying to edit a unexisting review", async () => {
        const body = createRequestBody();

        await testRequestStatus({
            method: "PATCH",
            body,
            endpoint: `/api/landmark/${landmark.id as string}/reviews/unexisting_review_id_123213qwe2e@`,
            Cookie: author.accessTokenAsCookie as string,
            expectedStatus: 404,
        });

        await expectReviewInDatabaseToBeNOTUpdated({
            body: body as any,
            where: {
                landmarkId: landmark.id as string,
                reviewerId: author.id as string,
            },
        });
    });

    test("User cannot edit other one's review", async () => {
        const diffrentUser = new MockUser();
        await diffrentUser.prepare();

        const body = createRequestBody();
        await testRequestStatus({
            body,
            method: "PATCH",
            endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
            Cookie: diffrentUser.accessTokenAsCookie as string,
            expectedStatus: 403,
        });

        await expectReviewInDatabaseToBeNOTUpdated({
            body: body as any,
            where: {
                landmarkId: landmark.id as string,
                reviewerId: author.id as string,
            },
        });

        await diffrentUser.remove();
    });

    describe("Cannot create a review with invalid data", () => {
        describe("Points", () => {
            test("Missing data", async () => {
                const body = createRequestBody();
                delete body.points;

                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
            test("Too big", async () => {
                const body = createRequestBody();
                body.points = 1000000;

                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
            test("Invalid type", async () => {
                const body = createRequestBody();
                body.points = "invalid type" as any;

                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
            test("To little", async () => {
                const body = createRequestBody();
                body.points = -12;

                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
        });
        describe("Review content", () => {
            test("Missing data", async () => {
                const body = createRequestBody();
                delete body.reviewContent;

                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
            test("Too big", async () => {
                const body = createRequestBody();
                body.reviewContent = VERY_LONG_STRING;

                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
            test("Invalid type", async () => {
                const body = createRequestBody();
                body.reviewContent = -12 as any;

                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
            test("To little", async () => {
                const body = createRequestBody();
                body.reviewContent = "small";

                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
        });
        describe("Tags", () => {
            test("Missing data", async () => {
                const body = createRequestBody();
                delete body.tags;
                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
            test("Too many tags", async () => {
                const body = createRequestBody();
                body.tags = ["lorem1", "lorem2", "lorem3", "lorem4", "lorem5", "lorem6"];
                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
            test("No tags", async () => {
                const body = createRequestBody();
                body.tags = [];

                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
            test("Invalid type", async () => {
                const body = createRequestBody();
                body.tags = 5 as any;

                await testRequestStatus({
                    method: "PATCH",
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                    expectedStatus: 400,
                    Cookie: author.accessTokenAsCookie as string,
                });
            });
            describe("Each tag has to match requirements as well", () => {
                test("Too big", async () => {
                    const body = createRequestBody();
                    body.tags = ["lorem1", VERY_LONG_STRING];
                    await testRequestStatus({
                        method: "PATCH",
                        body,
                        endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                        expectedStatus: 400,
                        Cookie: author.accessTokenAsCookie as string,
                    });
                });
                test("Invalid type", async () => {
                    const body = createRequestBody();
                    body.tags = [1, 2, 3] as any;
                    await testRequestStatus({
                        method: "PATCH",
                        body,
                        endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                        expectedStatus: 400,
                        Cookie: author.accessTokenAsCookie as string,
                    });
                });
                test("To little", async () => {
                    const body = createRequestBody();
                    body.tags = ["lorem1", "l"];
                    await testRequestStatus({
                        method: "PATCH",
                        body,
                        endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
                        expectedStatus: 400,
                        Cookie: author.accessTokenAsCookie as string,
                    });
                });
            });
        });
    });
});
