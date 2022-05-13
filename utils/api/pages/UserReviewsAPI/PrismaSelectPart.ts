// Namespace
import { Prisma } from "@prisma/client";

export const selectLandmarkReview = {
    select: {
        id: true,
        type: true,
        points: true,
        review: true,
        tags: true,
        createdAt: true,
        landmark: {
            select: {
                title: true,
                shortDescription: true,
                slug: true,
                folder: true,
                type: true,
                destination: {
                    select: {
                        country: true,
                        city: true,
                    },
                },
            },
        },
    },
} as Prisma.LandmarkReviewFindManyArgs;

export const selectDestinationReview = {
    select: {
        id: true,
        type: true,
        points: true,
        review: true,
        tags: true,
        createdAt: true,
        destination: {
            select: {
                city: true,
                continent: true,
                folder: true,
                shortDescription: true,
                countryCode: true,
                country: true,
                slug: true,
            },
        },
    },
} as Prisma.DestinationReviewFindManyArgs;
