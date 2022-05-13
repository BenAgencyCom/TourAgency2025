// Tools
import { prisma } from "@/prisma/db";
import SingleLandmarkAPI from "@/utils/api/pages/landmarks/SingleLandmarkAPI";
// Types
import type { FunctionComponent } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { DataFromAPI } from "@/@types/pages/landmarks/SingleLandmark";

const SingleLandmark: FunctionComponent<DataFromAPI> = (props) => {
    return (
        <>
            <span>{JSON.stringify(props)}</span>
        </>
    );
};

export default SingleLandmark;

export const getStaticProps: GetStaticProps<DataFromAPI, { slug: string }> = async (context) => {
    try {
        if (!context?.params?.slug) throw new Error();
        return {
            props: await new SingleLandmarkAPI(context.params.slug).main(),
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

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (await prisma.landmark.findMany({ select: { slug: true } })).map((item) => ({
        params: { slug: item.slug },
    }));
    return {
        paths,
        fallback: "blocking",
    };
};
