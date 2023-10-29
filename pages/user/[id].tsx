// Tools
import { prisma } from "@/prisma/db";
import UserProfileAPI from "@/utils/api/pages/UserProfileAPI";
import { NotFound } from "@/utils/api/Errors";
// Types
import type { FunctionComponent } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { User, PointsDistribution, LatestReview } from "@/@types/pages/UserProfile";
// Other components
import Reviews from "@/components/user_profile/Reviews";
import Landing from "@/components/user_profile/LandingScreen";
// Pivotal message to Kacper from future!
// Implement static imports for both `DestinationReviews` and `LandmarksReviews`
// you will know why and undoubtedly thank myself from the past
import Head from "next/head";
// Styled components
import ContentContainter from "@/components/_utils/styled/ContentContainter";

interface ProfileProps {
    user: User;
    pointsDistribution: PointsDistribution;
    latestReview: LatestReview;
}

const Profile: FunctionComponent<ProfileProps> = (props) => {
    return (
        <>
            <Head>
                <title>{`${props.user.name} ${props.user.surname} | Profile`}</title>
            </Head>

            <ContentContainter backgroundMap>
                <Landing
                    user={props.user} //
                    pointsDistribution={props.pointsDistribution}
                    latestReview={props.latestReview}
                ></Landing>
                <Reviews
                    userID={props.user.id} //
                    thereIsNoDataAtAll={props.pointsDistribution.reviewsInTotal === 0}
                ></Reviews>
            </ContentContainter>
        </>
    );
};

export default Profile;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (await prisma.user.findMany({ select: { id: true } })).map((item) => ({
        params: { id: item.id },
    }));
    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<ProfileProps, { id: string }> = async (context) => {
    try {
        if (!context?.params?.id) throw new NotFound();
        const UserProfile = new UserProfileAPI(context.params.id);

        return {
            props: {
                user: await UserProfile.getInfomationAboutUser(),
                pointsDistribution: await UserProfile.getPointsDistributions(),
                latestReview: await UserProfile.getLatestReviewScore(),
            },
        };
    } catch (e: unknown) {
        if (e instanceof NotFound) {
            return {
                redirect: {
                    destination: `/404?msg=${e.message}`,
                    permanent: false,
                },
            };
        }
        return {
            redirect: {
                destination: "/500",
                permanent: false,
            },
        };
    }
};
