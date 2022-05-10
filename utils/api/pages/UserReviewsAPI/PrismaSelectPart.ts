// Namespace
import { Prisma } from "@prisma/client";

export const selectLandmarkReview = {
    select: {
        type: true,
        points: true,
        landmark: {
            select: {
                title: true,
                shortDescription: true,
                slug: true,
                folder: true,
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
        type: true,
        points: true,
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
