// Tools
import { prisma } from "@/prisma/db";
// Types
import type { GetStaticPaths, GetStaticProps } from "next";
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/destinations/Reviews";
// Other components
import Head from "next/head";
import BulkReviews from "@/components/_utils/BulkReviews";

interface CertinDestinationReviewsProps {
    destination: Destination;
}

const CertinDestinationReviews: FunctionComponent<CertinDestinationReviewsProps> = ({ destination }) => {
    return (
        <>
            <Head>
                <title>{destination.city} | Reviews</title>
            </Head>

            <BulkReviews
                reviewsType="destination" //
                idOfReviewingItem={destination.id}
                landingScreen={{
                    breadcrumbs: [destination.continent, destination.country, destination.city],
                    description: destination.shortDescription,
                    folder: destination.folder,
                    header: destination.city,
                    slug: destination.slug,
                }}
            />
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (await prisma.destination.findMany({ select: { slug: true } })).map((item) => ({
        params: { slug: item.slug },
    }));
    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<{ destination: Destination }, { slug: string }> = async (context) => {
    try {
        if (!context?.params?.slug) throw new Error();

        const destination = await prisma.destination.findUnique({
            where: { slug: context.params.slug },
            select: {
                id: true,
                slug: true,
                city: true,
                country: true,
                countryCode: true,
                continent: true,
                folder: true,
                shortDescription: true,
            },
        });
        if (!destination) throw new Error();

        return {
            props: {
                destination,
            },
        };
    } catch (e: unknown) {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }
};
export default CertinDestinationReviews;
