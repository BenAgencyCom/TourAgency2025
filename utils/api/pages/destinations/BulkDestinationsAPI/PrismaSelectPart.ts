export const selectDestination = {
    select: {
        slug: true,
        city: true,
        country: true,
        population: true,
        continent: true,
        shortDescription: true,
        folder: true,
        landmarks: {
            select: {
                picture: true,
            },
            take: 3,
        },
    },
};
