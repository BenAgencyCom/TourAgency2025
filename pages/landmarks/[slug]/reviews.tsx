// Tools
import { prisma } from "@/prisma/db";
// Types
import type { FunctionComponent } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { Landmark } from "@/@types/pages/landmarks/Reviews";
// Other components
import Head from "next/Head";
import Content from "@/components/landmarks/reviews/Wrapper";

interface SingleLandmarkReviewsProps {
    landmark: Landmark;
}

const SingleLandmarkReviews: FunctionComponent<SingleLandmarkReviewsProps> = ({ landmark }) => {
    return (
        <>
            <Head>
                <title>{landmark.title} | Reviews</title>
            </Head>
            <Content landmark={landmark}></Content>
        </>
    );
};

export default SingleLandmarkReviews;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (await prisma.landmark.findMany({ select: { slug: true } })).map((item) => ({
        params: { slug: item.slug },
    }));
    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<{ landmark: Landmark }, { slug: string }> = async (context) => {
    try {
        if (!context?.params?.slug) throw new Error();
        const result = await prisma.landmark.findUnique({
            where: { slug: context.params.slug },
            select: {
                id: true,
                slug: true,
                title: true,
                type: true,
                folder: true,
                shortDescription: true,
                destination: {
                    select: {
                        city: true,
                        country: true,
                        continent: true,
                    },
                },
            },
        });
        if (!result) throw new Error();

        return {
            props: {
                landmark: result,
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
