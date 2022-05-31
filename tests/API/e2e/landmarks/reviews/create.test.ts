// Tools
import prisma from "@/tests/API/helpers/db";
import { testPOSTRequestStatus } from "@/tests/API/helpers/testStatus";
import { validDataRequestBody } from "@/tests/API/data/landmarks/reviews/create";
import { VERY_LONG_STRING } from "@/tests/API/data/landmarks/create/index";
// Mocks
import MockUser from "@/tests/API/helpers/mocks/MockUser";
import MockLandmark from "@/tests/API/helpers/mocks/MockLandmark";
import MockDestination from "@/tests/API/helpers/mocks/MockDestination";
// Types
import type { CreateReviewRequest } from "@/pages/api/landmark/[id]/reviews/@types";

const createRequestBody = (): Partial<CreateReviewRequest["body"]> => JSON.parse(JSON.stringify(validDataRequestBody));

describe("POST: api/landmark/[slug]/reviews", () => {
    const user = new MockUser();
    const destination = new MockDestination();
    const landmark = new MockLandmark();

    beforeAll(async () => {
        await user.prepare();
        await destination.prepare();
        await landmark.prepare(destination.id as string);
    });

    beforeEach(async () => {
        const where = {
            reviewerId: user.id as string,
            landmarkId: landmark.id as string,
        };
        if (await prisma.landmarkReview.findMany({ where })) {
            await prisma.landmarkReview.deleteMany({ where });
        }
    });

    afterAll(async () => {
        await user.remove();
        await destination.remove(); // landmark will be deleted automatically due to the CASCADE relation
    });

    test("User can create a review", async () => {
        await testPOSTRequestStatus({
            body: validDataRequestBody,
            endpoint: `/api/landmark/${landmark.id as string}/reviews`,
            expectedStatus: 201,
            Cookie: user.accessTokenAsCookie as string,
        });
        const reviewInDatabase = await prisma.landmarkReview.findFirst({
            where: {
                reviewerId: user.id as string,
                landmarkId: landmark.id as string,
            },
        });
        expect(reviewInDatabase).not.toBeFalsy();
        await prisma.landmarkReview.deleteMany({
            where: {
                reviewerId: user.id as string,
                landmarkId: landmark.id as string,
            },
        });
    });

    test("One user cannot create a few reviews to the same landmark", async () => {
        await testPOSTRequestStatus({
            body: validDataRequestBody,
            endpoint: `/api/landmark/${landmark.id as string}/reviews`,
            expectedStatus: 201,
            Cookie: user.accessTokenAsCookie as string,
        });
        await testPOSTRequestStatus({
            body: validDataRequestBody,
            endpoint: `/api/landmark/${landmark.id as string}/reviews`,
            expectedStatus: 409,
            Cookie: user.accessTokenAsCookie as string,
        });

        const reviewInDatabase = await prisma.landmarkReview.findMany({
            where: {
                reviewerId: user.id as string,
                landmarkId: landmark.id as string,
            },
        });
        expect(reviewInDatabase).toHaveLength(1);

        await prisma.landmarkReview.deleteMany({
            where: {
                reviewerId: user.id as string,
                landmarkId: landmark.id as string,
            },
        });
    });
    test("Anonymous cannot create a review", async () => {
        await testPOSTRequestStatus({
            body: validDataRequestBody,
            endpoint: `/api/landmark/${landmark.id as string}/reviews`,
            expectedStatus: 403,
        });
        const reviewInDatabase = await prisma.landmarkReview.findMany({
            where: {
                reviewerId: user.id as string,
                landmarkId: landmark.id as string,
            },
        });
        expect(reviewInDatabase).toHaveLength(0);
    });
    test("404 while trying to create a review of unexisting landmark", async () => {
        await testPOSTRequestStatus({
            body: validDataRequestBody,
            endpoint: `/api/landmark/uexsitingi23u9128u329/reviews`,
            expectedStatus: 404,
            Cookie: user.accessTokenAsCookie as string,
        });
        const reviewInDatabase = await prisma.landmarkReview.findMany({
            where: {
                reviewerId: user.id as string,
                landmarkId: "uexsitingi23u9128u329",
            },
        });
        expect(reviewInDatabase).toHaveLength(0);
    });
    describe("Cannot create a review with invalid data", () => {
        describe("Points", () => {
            test("Missing data", async () => {
                const body = createRequestBody();
                delete body.points;

                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Too big", async () => {
                const body = createRequestBody();
                body.points = 1000000;

                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Invalid type", async () => {
                const body = createRequestBody();
                body.points = "invalid type" as any;

                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("To little", async () => {
                const body = createRequestBody();
                body.points = -12;

                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
        });
        describe("Review content", () => {
            test("Missing data", async () => {
                const body = createRequestBody();
                delete body.reviewContent;

                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Too big", async () => {
                const body = createRequestBody();
                body.reviewContent = VERY_LONG_STRING;

                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Invalid type", async () => {
                const body = createRequestBody();
                body.reviewContent = -12 as any;

                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("To little", async () => {
                const body = createRequestBody();
                body.reviewContent = "small";

                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
        });
        describe("Tags", () => {
            test("Missing data", async () => {
                const body = createRequestBody();
                delete body.tags;
                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Too many tags", async () => {
                const body = createRequestBody();
                body.tags = ["lorem1", "lorem2", "lorem3", "lorem4", "lorem5", "lorem6"];
                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("No tags", async () => {
                const body = createRequestBody();
                body.tags = [];

                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Invalid type", async () => {
                const body = createRequestBody();
                body.tags = 5 as any;

                await testPOSTRequestStatus({
                    body,
                    endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            describe("Each tag has to match requirements as well", () => {
                test("Too big", async () => {
                    const body = createRequestBody();
                    body.tags = ["lorem1", VERY_LONG_STRING];
                    await testPOSTRequestStatus({
                        body,
                        endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                        expectedStatus: 400,
                        Cookie: user.accessTokenAsCookie as string,
                    });
                });
                test("Invalid type", async () => {
                    const body = createRequestBody();
                    body.tags = [1, 2, 3] as any;
                    await testPOSTRequestStatus({
                        body,
                        endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                        expectedStatus: 400,
                        Cookie: user.accessTokenAsCookie as string,
                    });
                });
                test("To little", async () => {
                    const body = createRequestBody();
                    body.tags = ["lorem1", "l"];
                    await testPOSTRequestStatus({
                        body,
                        endpoint: `/api/landmark/${landmark.id as string}/reviews`,
                        expectedStatus: 400,
                        Cookie: user.accessTokenAsCookie as string,
                    });
                });
            });
        });
    });
});
