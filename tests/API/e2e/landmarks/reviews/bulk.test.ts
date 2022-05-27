// Tools
import prisma from "@/tests/API/helpers/db";
import testPagination from "@/tests/API/helpers/testPagination";
import { testGETRequestStatus } from "@/tests/API/helpers/testStatus";
import makeRequest from "@/tests/API/helpers/landmarks/reviews/bulk/makeRequest";
import expectAllRecordsAreTheSameType from "@/tests/API/helpers/landmarks/reviews/bulk/expectAllRecordsAreTheSameType";
import expectAllRecordsToHaveProperlyAsignedFeedback from "@/tests/API/helpers/landmarks/reviews/bulk/expectAllRecordsToHaveProperlyAsignedFeedback";
// Mocks
import MockLandmark from "@/tests/API/helpers/mocks/MockLandmark";
import MockDestination from "@/tests/API/helpers/mocks/MockDestination";
// Types
import type { ReviewType } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";

const ALL_TYPES = ["MIXED", "NEGATIVE", "POSITIVE"] as ReviewType[];

describe("GET: api/landmark/[slug]/reviews", () => {
    const LANDMARK_ID = "1";

    test("404 when landmark does not exist", async () => {
        await testGETRequestStatus(`/api/landmark/UNEXISTING/reviews`, 404);
    });
    test("404 when landmark is not APPROVED", async () => {
        const destination = new MockDestination();
        const landmark = new MockLandmark();
        await destination.prepare();
        await landmark.prepare(destination.id);
        await testGETRequestStatus(`/api/landmark/${landmark.id}/reviews`, 404);

        await destination.remove();
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
