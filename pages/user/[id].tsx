// Tools
import { prisma } from "@/prisma/db";
import UserProfileAPI from "@/utils/api/pages/UserProfileAPI";
import { NotFound } from "@/utils/api/Errors";
// Types
import type { FunctionComponent } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { User, PointsDistribution } from "@/@types/pages/UserProfile";
// Other components
import Head from "next/Head";

interface ProfileProps {
    user: User;
    pointsDistribution: PointsDistribution;
}

const Profile: FunctionComponent<ProfileProps> = (props) => {
    return (
        <>
            <Head>
                <title>{`${props.user.name} ${props.user.surname} | Profile`}</title>
            </Head>

            <section>
                <span>PROFILE</span>
                <span>{JSON.stringify(props.user)}</span>
                <span>{JSON.stringify(props.pointsDistribution)}</span>
            </section>
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
