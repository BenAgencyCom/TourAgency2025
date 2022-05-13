import { Prisma } from "@prisma/client";

export const SelectMainLandmark = {
    select: {
        id: true,
        slug: true,
        title: true,
        folder: true,
        type: true,
        shortDescription: true,
        description: true,
        destination: {
            select: {
                city: true,
                country: true,
                continent: true,
                shortDescription: true,
                folder: true,
            },
        },
    },
} as Prisma.LandmarkFindUniqueArgs;

export const SelectAdditionalLandmarks = {
    select: {
        slug: true,
        title: true,
        folder: true,
        type: true,
        shortDescription: true,
    },
    orderBy: {
        createdAt: "desc",
    },
} as Prisma.LandmarkFindManyArgs;
