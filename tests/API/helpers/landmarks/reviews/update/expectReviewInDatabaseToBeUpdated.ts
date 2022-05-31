// Tools
import prisma from "@/tests/API/helpers/db";

interface Params {
    body: {
        tags: string[];
        reviewContent: string;
        points: number[];
    };
    where: {
        landmarkId: string;
        reviewerId: string;
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (params: Params) => {
    const reviewInDatabase = await prisma.landmarkReview.findFirst({
        where: {
            landmarkId: params.where.landmarkId,
            reviewerId: params.where.reviewerId,
        },
        select: {
            tags: true,
            review: true,
            points: true,
        },
    });

    expect(reviewInDatabase?.tags).toEqual(params.body.tags);
    expect(reviewInDatabase?.points).toEqual(params.body.points);
    expect(reviewInDatabase?.review).toEqual(params.body.reviewContent);
};
