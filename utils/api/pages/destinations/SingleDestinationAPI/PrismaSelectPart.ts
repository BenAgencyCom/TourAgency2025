import { Prisma } from "@prisma/client";

export const SelectMainDestination = {
    select: {
        id: true,
        slug: true,
        city: true,
        population: true,
        continent: true,
        shortDescription: true,
        description: true,
        country: true,
        folder: true,
        landmarks: {
            take: 3,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                slug: true,
                title: true,
                folder: true,
                type: true,
                shortDescription: true,
                destination: {
                    select: {
                        city: true,
                        country: true,
                    },
                },
            },
        },
    },
} as Prisma.DestinationFindUniqueArgs;
