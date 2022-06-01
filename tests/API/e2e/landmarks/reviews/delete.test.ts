// Tools
import prisma from "@/tests/API/helpers/db";
import { testRequestStatus } from "@/tests/API/helpers/testStatus";
// Mocks
import MockUser from "@/tests/API/helpers/mocks/MockUser";
import MockLandmark from "@/tests/API/helpers/mocks/MockLandmark";
import MockDestination from "@/tests/API/helpers/mocks/MockDestination";
import MockLandmarkReview from "@/tests/API/helpers/mocks/MockLandmarkReview";

describe("DELETE: /api/landmark/[landmark_id]/reviews/[review_id]", () => {
    const author = new MockUser();
    const destination = new MockDestination();
    const landmark = new MockLandmark();
    const landmarkReview = new MockLandmarkReview();

    const expectReviewToExist = async (exists: boolean) => {
        const reviewInDb = await prisma.landmarkReview.findFirst({
            where: {
                landmarkId: landmark.id as string,
                reviewerId: author.id as string,
            },
        });
        if (exists) expect(reviewInDb).not.toBeFalsy();
        else expect(reviewInDb).toBeFalsy();
    };

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

    test("Author of the review can delete it", async () => {
        await expectReviewToExist(true);
        await testRequestStatus({
            method: "DELETE",
            endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
            Cookie: author.accessTokenAsCookie as string,
            expectedStatus: 200,
        });
        await expectReviewToExist(false);
    });

    test("Admin can delete any review", async () => {
        const admin = new MockUser();
        await admin.prepare({ isAdmin: true });
        await expectReviewToExist(true);
        await testRequestStatus({
            method: "DELETE",
            endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
            Cookie: admin.accessTokenAsCookie as string,
            expectedStatus: 200,
        });
        await expectReviewToExist(false);

        await admin.remove();
    });

    test("404 when trying to delete a unexisting review", async () => {
        await expectReviewToExist(true);
        await testRequestStatus({
            method: "DELETE",
            endpoint: `/api/landmark/${landmark.id as string}/reviews/unexisting_review_id_123213qwe2e@`,
            Cookie: author.accessTokenAsCookie as string,
            expectedStatus: 404,
        });
        await expectReviewToExist(true);
    });

    test("User cannot delete other one's review", async () => {
        const diffrentUser = new MockUser();
        await diffrentUser.prepare();
        await expectReviewToExist(true);
        await testRequestStatus({
            method: "DELETE",
            endpoint: `/api/landmark/${landmark.id as string}/reviews/${landmarkReview.id as string}`,
            Cookie: diffrentUser.accessTokenAsCookie as string,
            expectedStatus: 403,
        });
        await expectReviewToExist(true);
        await diffrentUser.remove();
    });
});
