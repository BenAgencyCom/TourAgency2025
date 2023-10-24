// Tools
import { prisma } from "@/prisma/db";
import { styled } from "@mui/system";
import { landmarkPictureURL } from "@/utils/client/imageURLs";
import SingleLandmarkAPI from "@/utils/api/pages/landmarks/SingleLandmarkAPI";
// Types
import type { FunctionComponent } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { DataFromAPI } from "@/@types/pages/landmarks/SingleLandmark";
// Other components
import Head from "next/head";
import ScrollStepper from "@/components/_utils/ScrollStepper";
import ParallaxLanding from "@/components/_utils/ParallaxLanding";
import Destination from "@/components/landmarks/single/Destination";
import Description from "@/components/landmarks/single/Description";
import FewLatestReviews from "@/components/_utils/FewLatestReviews";
import ThreeRelatedLandmarks from "@/components/_utils/ThreeRelatedLandmarks";

const Content = styled("div")(({ theme }) => ({
    width: "100vw",
    position: "relative",
    marginTop: "100vh",
    paddingTop: "1px",
    background: theme.palette.background.paper,
    display: "flex",
    color: theme.palette.text.primary,
    flexDirection: "column",
    "&::before": {
        content: "''",
        position: "absolute",
        top: "-20px",
        width: "100%",
        height: "50px",
        background: theme.palette.background.paper,
        transform: "rotate(-1deg)",
    },
}));

const SingleLandmark: FunctionComponent<DataFromAPI> = (props) => {
    const { landmark, additionalLandmarks, reviews, reviewsInTotal } = props;
    return (
        <>
            <Head>
                <title>{landmark.title}</title>
            </Head>

            <ParallaxLanding
                headers={{
                    main: landmark.title,
                    top: landmark.destination.city,
                    bottom: landmark.destination.country,
                }}
                text={props.landmark.shortDescription}
                imagesURLs={{
                    highResolution: landmarkPictureURL(landmark.folder, "1080p", "thumbnail"),
                    lowResolution: landmarkPictureURL(landmark.folder, "360p", "thumbnail"),
                }}
            ></ParallaxLanding>
            <ScrollStepper
                steps={[
                    { title: "Landing", elementID: "landing-wrapper" },
                    { title: "Destination", elementID: "destination-wrapper" },
                    { title: "Description", elementID: "description-wrapper" },
                    { title: "Landmarks", elementID: "similar-landmarks" },
                    { title: "Reviews", elementID: "reviews" },
                ]}
            ></ScrollStepper>
            <Content>
                <Destination destination={landmark.destination}></Destination>
                <Description description={landmark.description} folder={landmark.folder}></Description>
                <ThreeRelatedLandmarks
                    id="similar-landmarks"
                    landmarks={additionalLandmarks} //
                    relatedPlace={landmark.destination.city}
                    header={{
                        text: "More beautiful places",
                    }}
                ></ThreeRelatedLandmarks>

                <FewLatestReviews
                    reviews={reviews} //
                    reviewsInTotal={reviewsInTotal}
                    url={`/landmarks/${landmark.slug}/reviews`}
                    reviewsType="landmark"
                ></FewLatestReviews>
            </Content>
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
