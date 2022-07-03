// Tools
import prisma from "@/tests/API/helpers/db";
import { validDataRequestBody } from "@/tests/API/data/review";
import { testRequestStatus } from "@/tests/API/helpers/testStatus";
import { VERY_LONG_STRING } from "@/tests/API/data/destinations/create/index";
// Mocks
import MockUser from "@/tests/API/helpers/mocks/MockUser";
import MockDestination from "@/tests/API/helpers/mocks/MockDestination";
// Types
import type { CreateReviewRequest } from "@/pages/api/destination/[destination_id]/reviews/@types";

const createRequestBody = (): Partial<CreateReviewRequest["body"]> => JSON.parse(JSON.stringify(validDataRequestBody));

describe("POST: /api/destination/[destination_id]/reviews", () => {
    const user = new MockUser();
    const destination = new MockDestination();

    beforeAll(async () => {
        await user.prepare();
        await destination.prepare();
    });

    beforeEach(async () => {
        const where = {
            reviewerId: user.id as string,
            destinationId: destination.id as string,
        };
        if (await prisma.destinationReview.findMany({ where })) {
            await prisma.destinationReview.deleteMany({ where });
        }
    });

    afterAll(async () => {
        await user.remove();
        await destination.remove(); // destination will be deleted automatically due to the CASCADE relation
    });

    test("User can create a review", async () => {
        await testRequestStatus({
            body: validDataRequestBody,
            endpoint: `/api/destination/${destination.id as string}/reviews`,
            expectedStatus: 201,
            Cookie: user.accessTokenAsCookie as string,
        });
        const reviewInDatabase = await prisma.destinationReview.findFirst({
            where: {
                reviewerId: user.id as string,
                destinationId: destination.id as string,
            },
        });
        expect(reviewInDatabase).not.toBeFalsy();
        await prisma.destinationReview.deleteMany({
            where: {
                reviewerId: user.id as string,
                destinationId: destination.id as string,
            },
        });
    });

    test("One user cannot create a few reviews to the same destination", async () => {
        await testRequestStatus({
            body: validDataRequestBody,
            endpoint: `/api/destination/${destination.id as string}/reviews`,
            expectedStatus: 201,
            Cookie: user.accessTokenAsCookie as string,
        });
        await testRequestStatus({
            body: validDataRequestBody,
            endpoint: `/api/destination/${destination.id as string}/reviews`,
            expectedStatus: 409,
            Cookie: user.accessTokenAsCookie as string,
        });

        const reviewInDatabase = await prisma.destinationReview.findMany({
            where: {
                reviewerId: user.id as string,
                destinationId: destination.id as string,
            },
        });
        expect(reviewInDatabase).toHaveLength(1);

        await prisma.destinationReview.deleteMany({
            where: {
                reviewerId: user.id as string,
                destinationId: destination.id as string,
            },
        });
    });
    test("Anonymous cannot create a review", async () => {
        await testRequestStatus({
            body: validDataRequestBody,
            endpoint: `/api/destination/${destination.id as string}/reviews`,
            expectedStatus: 403,
        });
        const reviewInDatabase = await prisma.destinationReview.findMany({
            where: {
                reviewerId: user.id as string,
                destinationId: destination.id as string,
            },
        });
        expect(reviewInDatabase).toHaveLength(0);
    });
    test("404 while trying to create a review of unexisting destination", async () => {
        await testRequestStatus({
            body: validDataRequestBody,
            endpoint: `/api/destination/uexsitingi23u9128u329/reviews`,
            expectedStatus: 404,
            Cookie: user.accessTokenAsCookie as string,
        });
        const reviewInDatabase = await prisma.destinationReview.findMany({
            where: {
                reviewerId: user.id as string,
                destinationId: "uexsitingi23u9128u329",
            },
        });
        expect(reviewInDatabase).toHaveLength(0);
    });
    describe("Cannot create a review with invalid data", () => {
        describe("Points", () => {
            test("Missing data", async () => {
                const body = createRequestBody();
                delete body.points;

                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Too big", async () => {
                const body = createRequestBody();
                body.points = 1000000;

                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Invalid type", async () => {
                const body = createRequestBody();
                body.points = "invalid type" as any;

                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("To little", async () => {
                const body = createRequestBody();
                body.points = -12;

                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
        });
        describe("Review content", () => {
            test("Missing data", async () => {
                const body = createRequestBody();
                delete body.reviewContent;

                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Too big", async () => {
                const body = createRequestBody();
                body.reviewContent = VERY_LONG_STRING;

                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Invalid type", async () => {
                const body = createRequestBody();
                body.reviewContent = -12 as any;

                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("To little", async () => {
                const body = createRequestBody();
                body.reviewContent = "small";

                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
        });
        describe("Tags", () => {
            test("Missing data", async () => {
                const body = createRequestBody();
                delete body.tags;
                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Too many tags", async () => {
                const body = createRequestBody();
                body.tags = ["lorem1", "lorem2", "lorem3", "lorem4", "lorem5", "lorem6"];
                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("No tags", async () => {
                const body = createRequestBody();
                body.tags = [];

                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            test("Invalid type", async () => {
                const body = createRequestBody();
                body.tags = 5 as any;

                await testRequestStatus({
                    body,
                    endpoint: `/api/destination/${destination.id as string}/reviews`,
                    expectedStatus: 400,
                    Cookie: user.accessTokenAsCookie as string,
                });
            });
            describe("Each tag has to match requirements as well", () => {
                test("Too big", async () => {
                    const body = createRequestBody();
                    body.tags = ["lorem1", VERY_LONG_STRING];
                    await testRequestStatus({
                        body,
                        endpoint: `/api/destination/${destination.id as string}/reviews`,
                        expectedStatus: 400,
                        Cookie: user.accessTokenAsCookie as string,
                    });
                });
                test("Invalid type", async () => {
                    const body = createRequestBody();
                    body.tags = [1, 2, 3] as any;
                    await testRequestStatus({
                        body,
                        endpoint: `/api/destination/${destination.id as string}/reviews`,
                        expectedStatus: 400,
                        Cookie: user.accessTokenAsCookie as string,
                    });
                });
                test("To little", async () => {
                    const body = createRequestBody();
                    body.tags = ["lorem1", "l"];
                    await testRequestStatus({
                        body,
                        endpoint: `/api/destination/${destination.id as string}/reviews`,
                        expectedStatus: 400,
                        Cookie: user.accessTokenAsCookie as string,
                    });
                });
            });
        });
    });
});
