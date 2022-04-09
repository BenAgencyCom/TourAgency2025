export const selectLandmarkReview = {
    select: {
        type: true,
        points: true,
        landmark: {
            select: {
                title: true,
                description: true,
                slug: true,
                picture: true,
                destination: {
                    select: {
                        country: true,
                        city: true,
                    },
                },
            },
        },
    },
};
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
};
