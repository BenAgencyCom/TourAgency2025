// Tools
import { prisma } from "@/prisma/db";
// Types
import type { GetStaticPaths, GetStaticProps } from "next";
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/destinations/Reviews";
// Other components
import Head from "next/Head";
import Content from "@/components/destinations/reviews/Wrapper";

interface CertinDestinationReviewsProps {
    destination: Destination;
}

const CertinDestinationReviews: FunctionComponent<CertinDestinationReviewsProps> = (props) => {
    return (
        <>
            <Head>
                <title>{props.destination.city} | Reviews</title>
            </Head>

            <Content destination={props.destination}></Content>
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
